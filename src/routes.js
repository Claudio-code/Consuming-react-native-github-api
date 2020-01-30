import React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Users from './pages/Users';

const mainStackNavigation = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#009688'
            },
            headerTitleAlign: 'center',
            headerTitle: 'Dashboard',
            headerTintColor: '#FFF',
        
        })
    },
    Users: {
        screen: Users,
        navigationOptions: ({navigation}) => ({
            headerTitleAlign: 'center',
            headerTitle: navigation.getParam('user').name,
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#009688'
            }
        })
    }
});


const app = createSwitchNavigator({
    mainStackNavigation: { screen: mainStackNavigation }
});

const Routes = createAppContainer(app);

export default Routes;