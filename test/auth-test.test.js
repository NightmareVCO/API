const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');

describe('Suite de pruebas de auth',() => {
   // Cuando no tiene correctamente la llave puesta
   it('should return 401 when no jwt token is provided',(done) => {
      chai.request(app)
         .get('/team')
         .end((err,res) => {
            chai.assert.equal(res.status,401);
            done();
         });
   });


   it('should return 200 when jwt is provided',(done) => {
      chai.request(app)
         .post('/login')
         .end((err,res) => {
            chai.request(app)
               .get('/team')
               .set('Authorization','JWT ' + res.body.token)
               .end((err,res) => {
                  chai.assert.equal(res.status,200);
                  done();
               });
         });
   });
});



