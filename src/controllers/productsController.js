const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let maxId = 0;
products.forEach(element => {
	if(element.id > maxId){ 
		maxId = element.id;
	}
});
maxId++;

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
			"id": maxId,
			"name": req.body.name,
			"price":req.body.price,
			"discount":req.body.discount,
			"category":req.body.category,
			"description":req.body.description,
			"image":req.body.image
		}
		products.push(productToStore);
		let productsJson=JSON.stringify(products,null,2)

		fs.writeFileSync("./src/data/productsDataBase.json",productsJson)

		return res.redirect("/")
	},
	
	// Update - Form to edit
	edit: (req, res) => {

		const product = products.find(product => product.id == req.params.id);

		if (product) {
			return res.render("product-edit-form",{product: product})
		}else{
			return res.send("error");
		}
	},
	
	// Update - Method to update
	update: (req, res) => {
		const productToEdit = products.find(product => product.id == req.params.id);
		
		res.send(productToEdit);
	},
	
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		

		const finalProduct = products.filter(product => product.id != req.params.id);
		
		let productsJson=JSON.stringify(finalProduct,null,2)

		console.log(finalProduct)

		fs.writeFileSync("./src/data/productsDataBase.json",productsJson);
		return  res.redirect("/")
	}
};

module.exports = controller;