const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/blog-posts');
const multer = require('multer');
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname);
      }
});
const upload = multer({
      storage: storage, limits: {
            fileSize: 1024 * 1024 * 5
      }
});

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/', upload.single('blogpostImage'), controller.create)
      .patch("/:id", controller.patchUpdate)
      .put("/:id", controller.putUpdate)
      .delete('/:id', controller.delete)

module.exports = router;