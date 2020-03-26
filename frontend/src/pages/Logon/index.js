import React, { useState } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
//Importando arquivo de estilização da página
import './styles.css';
//Impotando imagem utilizada na página
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
//Importando pacote de icons
import { FiLogIn } from 'react-icons/fi';
//Importando API: para conectar com o banco de dados
import api from '../../services/api';


//Página de Login
export default function Logon() {
    //Armazenando os dados dos input dentro de um estado, cada input um estado
    const [id, setId] = useState('');
    
    //Após o cadastro fazer com que va para página de profile
    const history = useHistory();

    //Função vai retorna o nome da ong e também validar se a ong existe
    async function hadleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            //Se der tudo certo
            //Salvando dados no navegador, no localStorage
            localStorage.setItem('ongId', id);//id da ong
            localStorage.setItem('ongName', response.data.name);//nome da ong
            
            //Enviando usuario para rota /profile , que é onde contém os casos
            history.push('/profile');

        } catch (err) {
            alert('Falha no login, tente novamente.');            
        }
    }
    
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />    

                
                <form onSubmit={hadleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    {/*Botão de cadastro de Ongs, mudando para a rota /register*/}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color='#E02041'/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}