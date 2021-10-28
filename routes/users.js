const router = require('express').Router();
const { updateProfileValidator } = require('../middlewares/validations');
const { getProfile, updateProfile } = require('../controllers/user');

router.get('/me', getProfile);

router.patch('/me', updateProfileValidator, updateProfile);

module.exports = router;
