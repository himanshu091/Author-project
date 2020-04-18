const express = require('express');
const router = express.Router();


// All Authors

router.get('/',(req,res)=>{
    res.render('index');
});
module.exports = router;