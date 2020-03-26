import React, { useState } from 'react';
//Importando pacote, para que em toda rota não precisa recarregar toda a página e sim somente mudar de rota
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
//Impotando imagem utilizada na página
import logoImg from '../../assets/logo.svg';
//Importando pacote de icons
import { FiArrowLeft } from 'react-icons/fi';
//Importando API
import api from '../../services/api';

//Página para cadastrar novo incidente
export default function NewIncident() {
    //Criando estados para cada um dos inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    //Pegando o id da ong que esta logada
    const ongId = localStorage.getItem('ongId');

    //Direcionando para rota /profile, após ter efetuado o cadastro de um novo incident/caso
    const history = useHistory();

    //Cadastrando novo incident / caso
    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value, 
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,//Verificando id do usuario logado
                }
            });

            history.push('/profile');

        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        } 
    }
    
    return (
        <div className="new-incident-container">
            {/*div da parte de fora com a cor cinza claro */}
            <div className="content">
                {/*Parte esquerda da página, parte escrita e botão*/}
                <section>
                    {/*Imagem da logo*/}
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041'/>
                        Voltar para home
                    </Link>

                </section>

                {/*Formulario de cadastro de casos*/}
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}//onChange: ouvir as mudanças que ocorrem no input    
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    {/*Botã
                        o de cadastrar*/}
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}