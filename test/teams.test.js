const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');

describe('Suite de pruebas de teams',() => {
   it('should return the team of the given user',(done) => {
      // Llave incorrecta
      chai.request(app)
         .post('/auth/login')
         .set('content-type','application/json')
         .send({ userName: 'mastermind',password: '1234' })
         .end((err,res) => {
            //Expect valid login
            chai.assert.equal(res.statusCode,200);
            chai.request(app)
               .get('/teams')
               .set('Authorization',`JWT ${res.body.token}`)
               .end((err,res) => {
                  // Tiene un team con Charizard y Blastoise
                  // { trainer: 'mastermind', team: ['Charizard', 'Blastoise'] }
                  chai.assert.equal(res.statusCode,200);
                  chai.assert.equal(res.body.trainer,'mastermind');
                  chai.assert.equal(res.body.team.length,2);
                  chai.assert.equal(res.body.team[0].name,'Charizard');
                  chai.assert.equal(res.body.team[1].name,'Blastoise');
                  done();
               });
         });
   });
});