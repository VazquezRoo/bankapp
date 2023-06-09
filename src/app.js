const express = require('express');

const cors = require('cors');

const usersRouter = require('./routes/user.router');

const transferRoutes = require('./routes/transfer.router');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/', usersRouter);

app.use('/api/v1/', transferRoutes);

module.exports = app;
