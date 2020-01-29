import React, { useState } from 'react';
import { Keyboard } from 'react-native';
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

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  async function handleAddUser() {
    const response = await api.get(`/users/${newUser}`);
    console.log(response.data);
    
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    };

    let usersForAdd = users;

    usersForAdd.push(data);

    setUsers(usersForAdd);
    setNewUser('');
    Keyboard.dismiss();
  }

  return (
    <Container>
      <Form>
        <Input 
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuario"
          placeholderTextColor="#757575"
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton onClick={handleAddUser}>
          <Icon 
            name="add"
            size={20}
            color="#FFF"
          />
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
              onPress={() => {}}
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
