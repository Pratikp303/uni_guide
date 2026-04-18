const Hostel = require('../models/Hostel');

// ==============================
// GET all hostels / SEARCH hostels
// ==============================
const getHostels = async (req, res) => {
  try {
    const { search, university } = req.query;

    let query = {};

    // 🔍 search by name/type/facilities
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
        { facilities: { $elemMatch: { $regex: search, $options: 'i' } } }
      ];
    }

    // 🎯 filter by university (optional)
    if (university) {
      query.universityId = university;
    }

    const hostels = await Hostel.find(query)
      .populate('universityId', 'name location')
      .sort({ name: 1 }); // alphabetical

    res.json(hostels);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// CREATE hostel
// ==============================
const createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==============================
// GET hostel by ID
// ==============================
const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id)
      .populate('universityId', 'name location');

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    res.json(hostel);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
module.exports = {
  getHostels,
  createHostel,
  getHostelById
};