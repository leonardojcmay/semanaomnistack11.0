import React, { useState, useEffect } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
//Importando pacote de icons
import { FiPower, FiTrash2 } from 'react-icons/fi';
//Importando estilização
import './styles.css';
//Impotando imagem utilizada na página
import logoImg from '../../assets/logo.svg';
//Importando API
import api from '../../services/api';

//Listar os casos da ONG que esta logada no sistema
export default function Profile() {
    //Buscando o nome da ong logada
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    //Salvando as informações em um estado
    const [incidents, setIncidents] = useState([]);

    //Voltando para o inicio após efetuar o Logout/Sair
    const history = useHistory();

    //Listagem dos casos: utilizando função useEffect, que serve para disparar alguma função em algum determinado momento do componente. Por exemplo: assim que ele é mostrado em tela
    //primeira função: função para carregar os casos e tudo mais, segunda função: quando que essa função irá ser executada
    useEffect(() => {
        //Buscando no banco de dados
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }

        }).then(response =>{
            setIncidents(response.data);
        });//Gravando a resposta em um estado
    }, [ongId]);//Colocado este parametro para que se caso o id da ong mudar, recarregar os casos dessa nova ong

    //Função de deletar um caso
    async function handleDeleteIncident(id) {//Vai receber o id do caso que deseja excluir
        try {
            
            await api.delete(`incidents/${id}`, {
                //Verificando se é o mesmo usuario que fez o cadastro do caso
                headers: {
                    Authorization: ongId,
                }
            });

            //Atualizando a página automaticamente após a exclusão, para retirar o caso deletado da lista
            setIncidents(incidents.filter(incident => incident.id !== id));//Retornar todos os incidentes diferentes deste id excluido

        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    //Função de logout: SAIR
    function handleLogout() {
        //Remover os dados de login do localStorage
        localStorage.clear();//Limpa todos os dados contidos no localStorage
           
        //Após logout, voltando para página inicial
        history.push('/');
    }

    return (
        <div className="profile-container">
            {/*Header: parte de cima no cabeçalho*/}
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>

                {/*Botão para cadastrar um novo caso/incidente*/}
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                {/*Botão de Logout/Sair*/}
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidents.map(incident => (    
                    /*Listagem de casos*/
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>{/*Passando para R$*/}

                        {/*Botão de apagar caso*/}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}