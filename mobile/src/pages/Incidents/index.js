import React, { useState, useEffect } from 'react';//useEffect: utilizado para carregar a lista de incidentes
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
//Importando icons
import { Feather } from '@expo/vector-icons';
//Importando pacote para fazer a navegação para pgina de mais detalhes
import { useNavigation } from '@react-navigation/native';
//Importando API
import api from '../../services/api';
//Importando logo
import logoImg from '../../assets/logo.png';
//Importando os estilos
import styles from './styles';

//Página de incidentes/casos
export default function Incidents() {

    //Fazendo páginação infinita
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //Estado que irá armazenar o total de itens
    const [total, setTotal] = useState(0);

    //Carregando a lista de incidentes
    const [incidents, setIncidents] = useState([]);

    //Função para navegar para página de mais detalhes
    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    //Carregando a lista de incidentes
    async function loadIncidents() {

        //Paginação infinita
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        //Colocando os dados do response em um estado para que seja possivel mostra-los em tela
        setIncidents([...incidents, ...response.data]);//Anexando dois vetores dentro de um unico vetor

        //Armazenando total de incidentes
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();        
    }, []);


    return (
        <View style={styles.container}>
            {/*Cabeçalho da pagina*/}
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            {/*FlatList: serve para fazer as listagens*/}
            {/*Listagem de casos*/}
            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                //showsVerticalScrollIndicator={false}//Para não mostrar a barra de scroll
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}//Carregando novos dados quando chegar a 20% do final da lista
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                    
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', 
                            { style: 'currency', 
                            currency: 'BRL' 
                            }).format(incident.value)}
                        </Text>
                        
                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            {/*Colocando icone*/}
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>

                )}
            />
        </View>
    );
}