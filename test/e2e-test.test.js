const chai = require('chai');
// Permite hacer test de integración, para poder levantar servidores y hacer solicitudes http
const chaiHttp = require('chai-http');

// use espera un plugin en este caso es chai-http
chai.use(chaiHttp);

const app = require('../app');

describe('Suite de pruebas e2e',() => {
   it('should return hello world',(done) => {
      chai.request(app) //Llama al servidor.
         .get('/') //Pide el endpoint
         .end((err,res) => { //Tomamos la respuesta la llamada anterior
            chai.assert.equal(res.text,'Hello World!');
            done(); //Para saber cuando termina el test.
         });
   });
});