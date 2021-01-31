import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Avatar, Text, ListItem} from 'react-native-elements';
import {fetchedContacts, loggedIn} from '../utils/helpers';

const Profile = () => {
  const data = loggedIn();
  var array = [];
  const [contacts, setContacts] = useState([1, 2, 3, 4]);
  useEffect(() => {
    fetchedContacts(data.uid)
      .then((res) => setContacts(res))
      .catch((err) => console.log(err));
  }, [contacts]);
  console.log(array);
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Avatar source={{uri: data.photoURL}} size="xlarge" rounded />
        <Text h3 style={{marginTop: 10}}>
          {data.displayName}
        </Text>
      </View>
      <View>
        {contacts.map((contact) => (
          <ListItem style={{width: '60%', marginLeft: '5%'}}>
            <ListItem.Content>
              <ListItem.Title>{contact.displayName}</ListItem.Title>
              <ListItem.Subtitle>
                {contact.phoneNumbers[0]?.number}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default Profile;
