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

   it('should return 400 when no data is provided',(done) => {
      chai.request(app)
         .post('/login')
         .end((err,res) => {
            //Expect valid login
            chai.assert.equal(res.statusCode,400);
            done();
         });
   });

   it('should return 200 and token for successful login',(done) => {
      chai.request(app)
         .post('/login')
         .set('content-type','application/json')
         .send({ userName: 'bettatech',password: '1234' })
         .end((err,res) => {
            //Expect valid login
            chai.assert.equal(res.statusCode,200);
            done();
         });
   });

   it('should return 200 when jwt is valid',(done) => {
      chai.request(app)
         .post('/login')
         .set('content-type','application/json')
         .send({ userName: 'bettatech',password: '1234' })
         .end((err,res) => {
            //Expect valid login
            chai.assert.equal(res.statusCode,200);
            chai.request(app)
               .get('/team')
               .set('Authorization',`JWT ${res.body.token}`)
               .end((err,res) => {
                  chai.assert.equal(res.statusCode,200);
                  done();
               });
         });
   });

});



