// require .Router()
const router = require('express').Router();

// Use routes defined in routes/notes if request starts with /api/notes
const notesRouter = require('./notes');
router.use('/notes', notesRouter);

module.exports = router;