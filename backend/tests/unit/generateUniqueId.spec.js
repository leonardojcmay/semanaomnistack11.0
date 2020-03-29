//Teste unitário
const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        //Exemplo: 
        //expect(2 + 2).toBe(4);//expect: espera que alguma coisa aconteça. Facilita na correção de erros/bugs no código
        
        const id = generateUniqueId();

        expect(id).toHaveLength(8);//Esperando que o id contenha 8 caracteres
    });
});