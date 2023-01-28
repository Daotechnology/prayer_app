const express = require('express');
const router = express.Router();


router.get('/profile',(req,res) => {
    try {
        return res.render('student_profile');
    } catch(e){
       return res.json({error:e.message})
    }
})

router.get('/update_profile',(req,res) => {
    try {
        return res.render('profile');
    } catch(e){
       return res.json({error:e.message})
    }
})


//Course Material

router.get('/course_material', (req,res) => {
    try {
        return res.render('course_material');
    } catch(e){
       return res.json({error:e.message})
    }
})


//Job Oppurtunities
router.get('/job', async(req, res) => {
    try {
        return res.render('job');
    } catch(e){
       return res.json({error:e.message});
    }
})

//Result Mnanaeent
router.get('/result', async(req, res) => {
    try {
        return res.render('result');
    } catch(e) {
       return res.json({error:e.message})
    }
})

module.exports = router;