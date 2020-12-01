import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Badge,
  Icon,
  Overlay,
  ListItem,
  Avatar,
  Button,
  Text,
} from 'react-native-elements';
import {deleteContact} from '../redux/actions';
import {firebase} from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import {loggedIn} from '../utils/helpers';
import {useNavigation} from '@react-navigation/native';

const ChooseContacts = ({props, styles}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const dispatch = useDispatch();
  const chosenContacts = useSelector((state) => state.user.chosenContacts);
  const navigation = useNavigation();
  const updateContacts = async (contacts) => {
    await contacts.map((contact) => {
      firebase
        .firestore()
        .collection('users')
        .doc(loggedIn().uid)
        .update({
          contacts: firebase.firestore.FieldValue.arrayUnion(contact),
        })
        .then((res) => console.log(res));
    });
  };
  return (
    <View style={styles}>
      <Icon
        raised
        name="contact_phone"
        type="material"
        onPress={() => toggleVisible()}
      />
      <Badge value={props.length} containerStyle={newStyles.container} />
      <Overlay
        isVisible={visible}
        onBackdropPress={() => toggleVisible()}
        overlayStyle={newStyles.modal}>
        <Text h4 h4Style={newStyles.heading}>
          Chosen Contacts
        </Text>
        {!props.length ? (
          <Text h3 h3Style={newStyles.txt}>
            Choose some contacts to continue !
          </Text>
        ) : (
          props.map((contact) => (
            <ListItem key={contact.rawContactId} style={newStyles.contact}>
              {contact.hasThumbnail ? (
                <Avatar source={{uri: contact?.thumbnailPath}} />
              ) : (
                <Avatar
                  rounded
                  title={contact.displayName[0]}
                  // activeOpacity={0.7}
                />
              )}
              <ListItem.Content>
                <ListItem.Title>{contact.displayName}</ListItem.Title>
                <ListItem.Subtitle>
                  {contact.phoneNumbers[0]?.number}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                name="delete"
                type="material"
                onPress={() => {
                  dispatch(deleteContact(contact));
                  console.log(props);
                }}
              />
            </ListItem>
          ))
        )}
        {props.length > 0 && (
          <Button
            icon={<Icon name="done" type="material" />}
            title="Finish"
            style={newStyles.modal_button}
            onPress={() => {
              updateContacts(chosenContacts).then((res) => console.log(res));
              navigation.navigate('Final Page');
              toggleVisible();
            }}
          />
        )}
      </Overlay>
    </View>
  );
};

const newStyles = StyleSheet.create({
  container: {position: 'absolute', top: -4, right: -4},
  modal: {
    width: '80%',
    height: '40%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  modal_button: {
    flex: 1,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  contact: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  txt: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  heading: {
    textAlign: 'center',
    paddingTop: 20,
  },
});

export default ChooseContacts;
