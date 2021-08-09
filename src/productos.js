const { Router } = require('express');
const multer = require('multer');

const productosRouter = new Router();
const productos = [
  {
    id: 0,
    name: 'inicial',
    thumbnail: null,
    price: 200,
  },
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

productosRouter.get('', (req, res) => {
  res.status(200).send(productos);
});

productosRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundProduct = productos.find((producto) => producto.id === Number(id));
  if (foundProduct) {
    res.status(200).send(foundProduct);
  } else {
    res.status(404).send(`There is no product with the id ${id}`);
  }
});

productosRouter.post('', upload.single('thumbnail'), (req, res) => {
  const product = req.body;
  product.id = Math.max(...productos.map((producto) => producto.id)) + 1;
  if (product.id < 0) {
    product.id = 0;
  }
  productos.push(product);
  res.status(200).send({ product });
});

productosRouter.put('/:id', upload.single('thumbnail'), (req, res) => {
  const { id } = req.query;
  const productPosition = productos.findIndex((producto) => producto.id === id);
  if (productPosition !== -1) {
    const product = productos[productPosition];
    if (req.body.title) {
      product.title = req.body.title;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.thumbnail) {
      product.thumbnail = req.body.thumbnail;
    }
    productos[productPosition] = product;
    res.status(200).send({ product });
  } else {
    res.status(404).send(`There is no product with the id ${id}`);
  }
});

productosRouter.delete('/:id', (req, res) => {
  const { id } = req.query;
  const productPosition = productos.findIndex((producto) => producto.id === id);
  if (productPosition !== -1) {
    productos.splice(productPosition, 1);
  } else {
    res.status(404).send(`There is no product with the id ${id}`);
  }
});

module.exports = { productos, productosRouter };
