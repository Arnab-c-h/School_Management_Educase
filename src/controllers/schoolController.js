const pool = require('../db/pool');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { calculateDistanceKm } = require('../utils/distance');
const {
  addSchoolSchema,
  listSchoolsSchema,
} = require('../validators/schoolValidator');

exports.addSchool = catchAsync(async (req, res, next) => {
  const { error, value } = addSchoolSchema.validate(req.body, {
    abortEarly: true,
    stripUnknown: false,
  });

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const { name, address, latitude, longitude } = value;

  const [result] = await pool.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude],
  );

  res.status(201).json({
    status: 'success',
    data: {
      school: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    },
  });
});

exports.listSchools = catchAsync(async (req, res, next) => {
  const { error, value } = listSchoolsSchema.validate(req.query, {
    abortEarly: true,
    convert: true,
    stripUnknown: false,
  });

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const userLatitude = Number(value.latitude);
  const userLongitude = Number(value.longitude);

  const [rows] = await pool.execute(
    'SELECT id, name, address, latitude, longitude FROM schools',
  );

  const schools = rows
    .map((school) => ({
      ...school,
      latitude: Number(school.latitude),
      longitude: Number(school.longitude),
      distanceKm: calculateDistanceKm(
        userLatitude,
        userLongitude,
        Number(school.latitude),
        Number(school.longitude),
      ),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  res.status(200).json({
    status: 'success',
    results: schools.length,
    data: {
      schools,
    },
  });
});
