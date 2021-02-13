const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		const productsInSale = products.filter(product => product.category == "in-sale");
		const LastVisited = products.filter(product => product.category == "visited");	


		return res.render("index", {title: "Home",LastVisited: LastVisited, productsInSale: productsInSale})
	},
	/*search: (req, res) => {
		// Do the magic
	},*/
};

module.exports = controller;
