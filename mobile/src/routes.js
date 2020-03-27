import React from 'react';
//Utilizado por volta de todas as rotas
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importando pagina de incidentes/casos
import Incidents from './pages/Incidents';
//Importando pagina de detalhes
import Detail from './pages/Detail';

//Dentro deste AppStack irá ser cadastrado as rotas da aplicação
const AppStack = createStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>{/*screenOptions: desabilitando cabeçalho padrão*/}

                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            
            </AppStack.Navigator>

        </NavigationContainer>
    );
}