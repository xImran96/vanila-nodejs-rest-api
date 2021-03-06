const products = require('../data/data');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

function find(){
	return new Promise((resolve, reject)=>{
		resolve(products);
	});
};

function findById(id){
	return new Promise((resolve, reject)=>{
		const product = products.find((p) => p.id === id)
		resolve(product)
	});
};


function create(product){
	return new Promise((resolve, reject)=>{
		const newProduct = {id: uuidv4(), ...product};
		products.push(newProduct);
		writeDataToFile('./data/data.json', products);
		resolve(newProduct);
	});
};

function update(product, id){
	return new Promise((resolve, reject)=>{
		const index = products.findIndex((p) => p.id === id);
		products[index] = {id, ...product}
		writeDataToFile('./data/data.json', products);
		resolve(products[index]);
	});
};


function remove(id){
	return new Promise((resolve, reject)=>{
	 let prods = products.filter((p)=> p.id !== id);	
		writeDataToFile('./data/data.json', prods);
		resolve();
	});
};


module.exports = {
	find,
	findById,
	create,
	update,
	remove
}