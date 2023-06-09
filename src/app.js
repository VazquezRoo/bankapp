const express = require('express');

const cors = require('cors');

const usersRouter = require('./routes/user.router');

const transferRoutes = require('./routes/transfer.router');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/', usersRouter);

app.use('/api/v1/', transferRoutes);

app.all('*', (req, res, next) => {
  return next(new AppError(`Sorry, Cant find ${req.originalUrl}! 😐`, 404));
});

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
