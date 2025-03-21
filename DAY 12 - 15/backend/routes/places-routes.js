const express = require('express');
const {check} = require('express-validator')

const router = express.Router();
const placesControllers = require('../controllers/places-controller')
const fileUpload = require('../middleware/file-upload')
const checkAuth = require('../middleware/check-auth')


router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.use(checkAuth);

router.post('/',
    fileUpload.single('image'),
   [ 
    check('title').not().isEmpty(),
    check('description').isLength({min:5}),
    check('address').not().isEmpty()
    ]
    ,placesControllers.createPlaces);
router.patch('/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({min:5})
    ]
,placesControllers.updatePlaceById)
router.delete('/:pid',placesControllers.deletePlaceById)


module.exports = router;
