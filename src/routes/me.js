const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/blogs', meController.storedBlogs);
router.get('/trash/blogs', meController.trashBlogs);

module.exports = router;
