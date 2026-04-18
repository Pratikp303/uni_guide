const Discipline = require('./Discipline'); // ✅ Fixed: Removed ../models/

// ==============================
// GET ALL DISCIPLINES
// ==============================
const getDisciplines = async (req, res) => {
  try {
    const disciplines = await Discipline.find();
    res.json(disciplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// CREATE DISCIPLINE
// ==============================
const createDiscipline = async (req, res) => {
  try {
    const { name, description } = req.body;

    // generate slug manually (no schema change)
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const discipline = new Discipline({
      name,
      slug,
      description
    });

    await discipline.save();

    res.status(201).json(discipline);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==============================
// 🔍 ADVANCED SEARCH DISCIPLINES
// ==============================
const searchDisciplines = async (req, res) => {
  try {
    const { name } = req.query;

    let filter = {};

    if (name) {
      filter = {
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { slug: { $regex: name, $options: 'i' } }
        ]
      };
    }

    let disciplines = await Discipline.find(filter);

    // optional: sort alphabetically
    disciplines = disciplines.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    res.json(disciplines);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// EXPORTS
// ==============================
module.exports = {
  getDisciplines,
  createDiscipline,
  searchDisciplines
};
