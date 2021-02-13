const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		return res.render("products",{products: products})
	},
	
	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product => product.id == req.params.id);

		if (product) {
			return res.render("detail", {product: product})
		}else{
			return res.send("error");
		}
		
	},
	
	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const productToStore = {
			"id": 2,
			"name": req.body.name,
			"price":req.body.price,
			"discount":req.body.discount,
			"category":req.body.category,
			"description":req.body.description,
			"image":req.body.image
		}
		products.push(productToStore);
		let productsJson=JSON.stringify(products,null,2)
	

		console.log(productsJson)
		fs.writeFileSync("./src/data/productsDataBase.json",productsJson)

		res.redirect("/")
	},
	/*
	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}*/
};

module.exports = controller;