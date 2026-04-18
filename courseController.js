const Course = require('../models/Course');

// ==============================
// GET ALL COURSES
// ==============================
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('universityId', 'name location')
      .populate('disciplineId', 'name');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// CREATE COURSE
// ==============================
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==============================
// 🔍 SEARCH COURSES (IMPROVED)
// ==============================
const searchCourses = async (req, res) => {
  try {
    const { title, location, discipline } = req.query;

    let filter = {};

    // 🔹 Title filter
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    const courses = await Course.find(filter)
      // 🔹 University filter (location)
      .populate({
        path: 'universityId',
        select: 'name location',
        match: location
          ? {
              $or: [
                { "location.city": { $regex: `^${location}$`, $options: 'i' } },
                { "location.state": { $regex: `^${location}$`, $options: 'i' } },
                { "location.country": { $regex: `^${location}$`, $options: 'i' } }
              ]
            }
          : {}
      })
      // 🔹 Discipline filter
      .populate({
        path: 'disciplineId',
        select: 'name',
        match: discipline
          ? {
              name: { $regex: `^${discipline}$`, $options: 'i' }
            }
          : {}
      });

    // 🔹 Remove unmatched results
    const filteredCourses = courses.filter(
      (course) =>
        (!location || course.universityId) &&
        (!discipline || course.disciplineId)
    );

    res.json(filteredCourses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================
// EXPORTS
// ==============================
module.exports = {
  getCourses,
  createCourse,
  searchCourses
};