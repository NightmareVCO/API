const assert = require('chai').assert;

// Agrupaciones de todo el conjunto de tests
// Si los test están relacionados deberían ir dentro de la misma suit.

function add(a,b) {
   return a + b;
}

describe('Suite de pruebas',() => {

   // Para describir ur test utilizamos it.
   it('should return 2',() => {
      let result = add(1,1);
      assert.equal(result,2);
   });

});