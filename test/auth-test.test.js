const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const usersController = require('../controllers/users');
const app = require('../app');

// Antes de ejecutar el describe completo, se insertan
before((done) => {
   usersController.registerUser('bettatech','1234');
   usersController.registerUser('mastermind','1234');
   done();
});

describe('Suite de pruebas de auth',() => {
   // Cuando no tiene correctamente la llave puesta
   it('should return 401 when no jwt token is provided',(done) => {
      chai.request(app)
         .get('/teams')
         .end((err,res) => {
            chai.assert.equal(res.status,401);
            done();
         });
   });

   it('should return 400 when no data is provided',(done) => {
      chai.request(app)
         .post('/auth/login')
         .end((err,res) => {
            //Expect valid login
            chai.assert.equal(res.statusCode,400);
            done();
         });
   });

   it('should return 200 and token for successful login',(done) => {
      chai.request(app)
         .post('/auth/login')
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
         .post('/auth/login')
         .set('content-type','application/json')
         .send({ userName: 'bettatech',password: '1234' })
         .end((err,res) => {
            //Expect valid login
            chai.assert.equal(res.statusCode,200);
            chai.request(app)
               .get('/teams')
               .set('Authorization',`JWT ${res.body.token}`)
               .end((err,res) => {
                  chai.assert.equal(res.statusCode,200);
                  done();
               });
         });
   });

});
// 
after((done) => {
   usersController.cleanUserDatabase();
   done();
})


