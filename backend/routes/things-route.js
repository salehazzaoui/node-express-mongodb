const express = require('express');
const { createThing, getAllThings, getThing, updateThing, deleteThing } = require('../controllers/things-controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.post('/', auth, multer, createThing);
router.get('/', getAllThings);
router.get('/:id', getThing)
router.put('/:id', auth, multer, updateThing);
router.delete('/:id', auth, deleteThing);

module.exports = router;