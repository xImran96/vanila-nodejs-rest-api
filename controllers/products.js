const Product =  require('../models/productModel');
const { getPostData } =  require('../utils');



async function createProduct(req, res){
	try{

		// let body = '';

		// req.on('data', (chunk) => {
		// 		body += chunk.toString();
		// });

		// console.log(body);

		// req.on('end', async () => {

		// 	const {name, model, release_year } = JSON.parse(body);

		// 	const product = {
		// 			name: name,
		// 			model: model,
		// 			release_year: release_year
		// }
		// const newProduct = await Product.create(product);
		// res.writeHead(201, {'Content-Type': 'application/json'});
		// return res.end(JSON.stringify(product));

		// })


		let body = await getPostData(req);

		const { name, model, release_year } = JSON.parse(body);

		const product = {
					name: name,
					model: model,
					release_year: release_year
		}

		const newProduct = await Product.create(product);
		res.writeHead(201, {'Content-Type': 'application/json'});
		return res.end(JSON.stringify(product));
	
	}catch(error){

		console.log(error);
	}
}



async function updateProduct(req, res, id){

	try{

		let prod = await Product.findById(id);

		if(!prod){
		
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: 'Not Found'}));
		
		}else{

			let body = await getPostData(req);

			const { name, model, release_year } = JSON.parse(body);

			const product = {
						name: name || prod.name ,
						model: model || prod.model,
						release_year: release_year || prod.release_year
			}

			const newProduct = await Product.update(product, id);
			res.writeHead(201, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(newProduct));
	

		} 

	}catch(error){

		console.log(error);
	}
}


async function getProducts(req, res){
	try{
		const products = await Product.find();
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(products));
	}catch(error){
		console.log(error);
	}
}

async function getProduct(req, res, id){
	try{
		const product = await Product.findById(id);
		if(!product){
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: 'Not Found'}));
		}else{
			
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(product));
		}

	}catch(error){
		console.log(error);
	}
}



async function deleteProduct(req, res, id){

	try{
		
		const product = await Product.findById(id);


		if(!product){

			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: 'Not Found'}));

		}else{
			
			await Product.remove(id);
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: `Product ${id} is removed.`}));	
		}

	}catch(error){
		console.log(error);
	}
}


module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
};