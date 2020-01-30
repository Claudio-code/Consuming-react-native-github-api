import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../service/api';

import { 
  Container, 
  Form, 
  Input, 
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
} from './styles';

export default function Main({ navigation }) {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      // await AsyncStorage.removeItem('usersSalved');
      let usersSalved = await AsyncStorage.getItem('usersSalved');
      if (typeof(usersSalved) === 'string') {
        setUsers(JSON.parse(usersSalved))
      }
      
    }
    getUsers();
  }, []);
  
  function handleNavigate(item) {
    navigation.navigate('Users', { user: item });
  }

  async function handleAddUser() {
    try {
      if (!newUser || newUser === null) {
        Alert.alert('Campo vazio', 'Para cadastrar os usuarios preença o campo');
        return;
      }
        setLoading(true);
        const response = await api.get(`/users/${newUser}`);
        
      if (!response.data.length === 0) {
        Alert.alert('usario nao encontrado', 'tente novamente');
        return;
      }
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url
      };

      let usersForAdd = users;

      usersForAdd.push(data);

      setUsers(usersForAdd);
      await AsyncStorage.setItem('usersSalved', JSON.stringify(usersForAdd));
      setNewUser(null);
      Keyboard.dismiss();
      setLoading(false);

    } catch (error) {
      console.log(error);
      
      setLoading(false);
    }
  }

  return (
    <Container >
      <Form >
        <Input 
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuario"
          placeholderTextColor="#757575"
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {
            loading ? (
              <ActivityIndicator color="#FFF" />
            ):(
              <Icon name="add" size={20} color="#FFF"/>
            )
          }
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar 
              source={{ uri: item.avatar }} 
            />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton
              onPress={() => handleNavigate(item)}
            >
              <ProfileButtonText>
                Ver perfil
              </ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
