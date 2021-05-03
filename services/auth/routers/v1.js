const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/auth');

router.post('/register', controller.register)
      .post('/login', controller.login)
      .get('/refresh-token', controller.refreshToken)
      .delete('/:id', controller.delete);

module.exports = router;