const University = require('./University'); // ✅ Fixed: Removed ../models/

// ==============================
// GET ALL UNIVERSITIES
// ==============================
const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// CREATE UNIVERSITY
// ==============================
const createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==============================
// 🔍 SEARCH UNIVERSITIES (FIXED)
// ==============================
const searchUniversities = async (req, res) => {
  try {
    const { location, name } = req.query;

    let filter = {};

    // CASE 1: BOTH name + location
    if (name && location) {
      filter = {
        $and: [
          { name: { $regex: name, $options: 'i' } },
          {
            $or: [
              { "location.city": { $regex: `^${location}$`, $options: 'i' } },
              { "location.state": { $regex: `^${location}$`, $options: 'i' } },
              { "location.country": { $regex: `^${location}$`, $options: 'i' } }
            ]
          }
        ]
      };
    }

    // CASE 2: ONLY name
    else if (name) {
      filter = {
        name: { $regex: name, $options: 'i' }
      };
    }

    // CASE 3: ONLY location
    else if (location) {
      filter = {
        $or: [
          { "location.city": { $regex: `^${location}$`, $options: 'i' } },
          { "location.state": { $regex: `^${location}$`, $options: 'i' } },
          { "location.country": { $regex: `^${location}$`, $options: 'i' } }
        ]
      };
    }

    const universities = await University.find(filter);
    res.json(universities);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// EXPORTS
// ==============================
module.exports = {
  getUniversities,
  createUniversity,
  searchUniversities
};
