const express = require('express');

//controllers
const transferRoute = require('./../controllers/transfer.controller');
const router = express.Router();

router.route('/').post(transferRoute.sentTransfer);

module.exports = router;
