const http = require('http');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controllers/products');

const server = http.createServer((req, res)=>{
		if(req.url === '/api/products' && req.method === 'GET'){
			getProducts(req, res);

		}
		else if(req.url === '/api/products' && req.method === 'POST'){
			createProduct(req, res);
		}
		else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET'){
				const id = req.url.split('/')[3];
			
				getProduct(req, res, id)
		}

		else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT'){
				const id = req.url.split('/')[3];
				updateProduct(req, res, id)
		}

		//for integer id else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){

		else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE'){
				const id = req.url.split('/')[3];
				 deleteProduct(req, res, id)
		}

	
		else{
			res.writeHead(404, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: "no products available."}));
		}

});


server.listen(4000, ()=>{
	console.log('Connected');
})