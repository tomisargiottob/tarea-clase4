const express = require('express');
const path = require('path');

const { productosRouter } = require('./productos');

const app = express();

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;

app.use('/api/productos', productosRouter);
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, './files/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server up and listening on: http://localhost:${PORT}`);
});
