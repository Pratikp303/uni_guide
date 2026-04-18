const Course = require('../models/Course');
const Fee = require('../models/Fee');
const Hostel = require('../models/Hostel');

// ==============================
// 🔥 MASTER SEARCH API
// ==============================
const masterSearch = async (req, res) => {
  try {
    const { title, location, discipline, minFee, maxFee } = req.query;

    // ==============================
    // STEP 1: GET COURSES
    // ==============================
    let courseFilter = {};

    if (title) {
      courseFilter.title = { $regex: title, $options: 'i' };
    }

    const courses = await Course.find(courseFilter)
      .populate({
        path: 'universityId',
        select: 'name location',
        match: location
          ? {
              $or: [
                { "location.city": { $regex: location, $options: 'i' } },
                { "location.state": { $regex: location, $options: 'i' } }
              ]
            }
          : {}
      })
      .populate({
        path: 'disciplineId',
        select: 'name',
        match: discipline
          ? { name: { $regex: discipline, $options: 'i' } }
          : {}
      });

    // remove unmatched
    const filteredCourses = courses.filter(
      c => (!location || c.universityId) &&
           (!discipline || c.disciplineId)
    );

    // ==============================
    // STEP 2: GET FEES
    // ==============================
    const courseIds = filteredCourses.map(c => c._id);

    let feeFilter = { courseId: { $in: courseIds } };

    if (minFee || maxFee) {
      feeFilter.totalEstimatedCost = {};
      if (minFee) feeFilter.totalEstimatedCost.$gte = Number(minFee);
      if (maxFee) feeFilter.totalEstimatedCost.$lte = Number(maxFee);
    }

    const fees = await Fee.find(feeFilter);

    // ==============================
    // STEP 3: GET HOSTELS
    // ==============================
    const universityIds = filteredCourses.map(c => c.universityId._id);

    const hostels = await Hostel.find({
      universityId: { $in: universityIds }
    });

    // ==============================
    // STEP 4: COMBINE DATA
    // ==============================
    const result = filteredCourses.map(course => {
      const fee = fees.find(f => f.courseId.toString() === course._id.toString());
      const uniHostels = hostels.filter(
        h => h.universityId.toString() === course.universityId._id.toString()
      );

      return {
        course,
        fee,
        hostels: uniHostels
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  masterSearch
};