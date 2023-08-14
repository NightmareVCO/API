const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');

describe('Suite de pruebas de teams',() => {
   it('should return the team of the given user',(done) => {
      // Llave incorrecta
      let team = [{ name: 'Charizard' },{ name: 'Blastoise' }];

      chai.request(app)
         .post('/auth/login')
         .set('content-type','application/json')
         .send({ userName: 'mastermind',password: '1234' })
         .end((err,res) => {
            let token = res.body.token;
            //Expect valid login
            chai.assert.equal(res.statusCode,200);
            chai.request(app)
               .put('/teams')
               .send({ team: team })
               .set('Authorization',`JWT ${token}`)
               .end((err,res) => {
                  chai.request(app)
                     .get('/teams')
                     .set('Authorization',`JWT ${token}`)
                     .end((err,res) => {
                        // Tiene un team con Charizard y Blastoise
                        // { trainer: 'mastermind', team: ['Charizard', 'Blastoise'] }
                        chai.assert.equal(res.statusCode,200);
                        chai.assert.equal(res.body.trainer,'mastermind');
                        chai.assert.equal(res.body.team.length,team.length);
                        chai.assert.equal(res.body.team[0].name,team[0].name);
                        chai.assert.equal(res.body.team[1].name,team[1].name);
                        done();
                     });
               });
         });
   });

   it('should return the pokedex number',(done) => {
      // Llave incorrecta
      let pokemonName = 'Bulbasaur';

      chai.request(app)
         .post('/auth/login')
         .set('content-type','application/json')
         .send({ userName: 'bettatech',password: '1234' })
         .end((err,res) => {
            let token = res.body.token;
            //Expect valid login
            chai.assert.equal(res.statusCode,200);
            chai.request(app)
               .post('/teams/pokemons')
               .send({ name: pokemonName })
               .set('Authorization',`JWT ${token}`)
               .end((err,res) => {
                  chai.request(app)
                     .get('/teams')
                     .set('Authorization',`JWT ${token}`)
                     .end((err,res) => {
                        // Tiene un team con Charizard y Blastoise
                        // { trainer: 'mastermind', team: ['Charizard', 'Blastoise'] }
                        chai.assert.equal(res.statusCode,200);
                        chai.assert.equal(res.body.trainer,'bettatech');
                        chai.assert.equal(res.body.team.length,1);
                        chai.assert.equal(res.body.team[0].name,pokemonName);
                        chai.assert.equal(res.body.team[0].pokemonNumber,1);
                        done();
                     });
               });
         });
   });
});