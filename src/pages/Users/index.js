import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import api from '../../service/api';
import { 
  Container, 
  Avatar, 
  Bio,
  Name, 
  Header,
  Stars,
  Starred,
  QwnerAvatar,
  Info,
  Title,
  Author
} from './styles';

export default function Users({ navigation }) {
  const [stars, setStars] = useState([]); 
  const [user, setUser] = useState('');
  
  useEffect(() => {
    async function getRepositoryStartedIsUser() {
      try {
        setUser(navigation.getParam('user'));
        const response = await api.get(`/users/${user.login}/starred`);
        console.log(user);
        
        if (response.data) {
          // console.log(response.data);
          setStars(response.data);
        }
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
    getRepositoryStartedIsUser();
  }, []);
  
  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <Stars 
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({ item }) => (
          <Starred>
            <QwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}
