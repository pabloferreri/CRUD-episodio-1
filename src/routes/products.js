// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");

// ************ Multer Require ************
const multer = require("multer");

let multerDiskStorege = multer.diskStorage({

    destination: (req,file,cb)=>{
        let folder = path.join(__dirname,"../../public/images/products");
        cb(null,folder);
    },
    filename: (req,file,cb)=>{
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null,imageName);
    }

})

let fileUpload = multer({storege: multerDiskStorege});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', fileUpload.single("productImage"),productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/edit/:id', fileUpload.single("productImage"),productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/', productsController.destroy);

module.exports = router;
