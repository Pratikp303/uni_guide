const Fee = require('./Fee'); // ✅ Fixed: Points to main folder

// ==============================
// GET ALL FEES
// ==============================
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate({
        path: 'courseId',
        select: 'title',
        populate: {
          path: 'universityId',
          select: 'name location'
        }
      });

    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// CREATE FEE
// ==============================
const createFee = async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==============================
// 🔍 SEARCH FEES BY COURSE NAME
// (FLEXIBLE + WORKING)
// ==============================
const searchFeesByCourseName = async (req, res) => {
  try {
    const { courseName } = req.query;

    const fees = await Fee.find()
      .populate({
        path: 'courseId',
        select: 'title',
        match: courseName
          ? { title: { $regex: courseName, $options: 'i' } } // flexible match
          : {}
      });

    // remove unmatched results
    const filteredFees = fees.filter(fee => fee.courseId);

    res.json(filteredFees);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// EXPORTS
// ==============================
module.exports = {
  getFees,
  createFee,
  searchFeesByCourseName
};
