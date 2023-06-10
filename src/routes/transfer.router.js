const express = require('express');

//controllers
const transferRoute = require('./../controllers/transfer.controller');

const validTransfer = require('./../middlewares/transfer.middleware');

const router = express.Router();

router.route('/').post(validTransfer.validParams, transferRoute.sentTransfer);

module.exports = router;
