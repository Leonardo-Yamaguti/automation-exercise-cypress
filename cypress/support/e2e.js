require('cypress-mochawesome-reporter/register');
require('./commands');

// Erros da aplicacao continuam falhando os testes.
// Nao ha listener global para suprimir uncaught:exception.

