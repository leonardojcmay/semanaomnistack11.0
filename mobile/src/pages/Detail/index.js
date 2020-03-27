import React from 'react';
//Importando icons
import { Feather } from '@expo/vector-icons';
import { View, ScrollView , Image, Text, TouchableOpacity, Linking } from 'react-native';//Linking: pacote utilizado na função do Whatsapp
//Importando pacote para fazer a navegação para pagina de mais detalhes
import { useNavigation, useRoute } from '@react-navigation/native';//useRoute: serve para pegar informações especificas da pagina atual da aplicação
//Importando pacote para função do e-mail
import * as MailComposer from 'expo-mail-composer';
//Importando os estilos
import styles from './styles';
//Importando logo
import logoImg from '../../assets/logo.png';


//Página de detalhes
export default function Detail() {

    //Pegar informações da pagina atual que esta navegando
    const route = useRoute();
    const incident = route.params.incident;
    
    //Função para retornar para página anterior na seta
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    //Mensagem para função e-mail e whatsapp
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    //Função para o botão de e-mail
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,//Assunto da mensagem
            recipients: [incident.email],//Para quem este e-mail irá ser enviado
            body: message,
        })
    }

    //Função para o botão whatsapp
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);

    }

    return (
        <View style={styles.container}>
            {/*Cabeçalho da pagina*/}
            <View style={styles.header}>
                {/*Imagem logo*/}
                <Image source={logoImg} />
                
                {/*Chamando função para retornar na pagina anterior*/}
                <TouchableOpacity onPress={navigateBack}>
                    {/*Icone*/}
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/*Dados do incidente*/}
                <View style={styles.incident}>
                        
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>{/*Fazendo duas estilizações dentro da mesma tag*/}
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
    
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', 
                        { style: 'currency', 
                        currency: 'BRL' 
                        }).format(incident.value)}
                    </Text>
                    
                </View>
                    
                {/*Box para entrar em contato*/}
                <View style={styles.container}>
                    
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>
                    {/*Botões para entrar em contato*/}
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>Whatsapp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>  
        </View>
    );
}