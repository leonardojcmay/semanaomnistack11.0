import React, { useState } from 'react';//useState: para fazer com que o número do contador na pagina web atualize automaricamente, ou seja, renderize automaticamente

import Header from './Header';

//JSX: é quando o arquivo HTML esta escrito dentro de um arquivo JavaScript
function App() {
  const [counter, setCounter] = useState(0);//Quando utiliza-se o useState ele retorna um Array com duas posições.
  //Array [valor, funcaoDeAtualizacao]
  //Irá chamar o setCounter toda vez que precisar atualizar o valor do counter

  //Função de incrementar
  function increment() {
    setCounter(counter + 1);

  }

  //Exemplo contador
  return (
    <div>
      <Header>Contador: {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>      
  );
}

export default App;
