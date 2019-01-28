// deklarasi express
const express = require('express');
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = 3000;

// deklarasi bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// deklarasi sequelize
const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql://root:@localhost:3306/orang'); // mysql
const sequelize = new Sequelize('sqlite://orang.db'); // sqlite
// autentikasi sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// model orang
const Orang = sequelize.define('orang', {
  nama: {
    type: Sequelize.STRING
  },
  alamat: {
    type: Sequelize.STRING
  },
  umur: {
    type: Sequelize.INTEGER
  }
});

// force: true will drop the table if it already exists
Orang.sync({force: true}).then(() => {
  // Table created
  return Orang.bulkCreate([{
      nama: 'Agung Sapto Margono Dh',
      alamat: 'Nunggalrejo, Punggur, Lampung Tengah',
      umur: 22
    }, {
      nama: 'Ratih Kartika Sari',
      alamat: 'Kemiling, Bandar Lampung',
      umur: 22
    }]);
});

// listen ke port yang sudah ditentukan
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// routing
// hello world
app.get('/', (req, res) => res.send('Hello World!'));
// get all
app.get('/orangs', (req, res) => {
  Orang.findAll().then(orangs => res.json(orangs));
})
// get one
app.get('/orangs/:id', (req, res) => {
  Orang.findByPk(req.params.id).then(orang => res.json(orang));
})
// create
app.post('/orangs', (req, res) => {
  Orang.create({
    nama: req.body.nama,
    alamat: req.body.alamat,
    umur: req.body.umur,
  }).then(orang => {
    res.json(orang);
  })
})
// update
app.put('/orangs/:id', (req, res) => {
  Orang.update({
    nama: req.body.nama,
    alamat: req.body.alamat,
    umur: req.body.umur,
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    Orang.findByPk(req.params.id).then(orang => res.json(orang));
  })
})
// delete
app.delete('/orangs/:id', (req, res) => {
  Orang.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    Orang.findByPk(req.params.id).then(orang => res.json(orang));
  })
})