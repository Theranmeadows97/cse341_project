const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact API',
    description: 'Contacts'
  },

  // RENDER
//   host: 'theran923default.onrender.com',
//   schemes: ['https']
// };

//LOCALHOST

host: 'localhost:3000',
schemes: ['http']
};



const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);