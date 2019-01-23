// deklarasi express
const express = require('express');
const app = express();
const port = 3000;

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
app.get('/', (req, res) => res.send('Hello World!'));