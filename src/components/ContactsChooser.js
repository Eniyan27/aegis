// import React from 'react';
// import {View, Text, PermissionsAndroid} from 'react-native';
// import Contacts from 'react-native-contacts';
// import {useDispatch, useSelector} from 'react-redux';
// const ContactsChooser = () => {
//   try {
//     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
//       title: 'Contacts',
//       message: 'This app would like to view your contacts.',
//       buttonPositive: 'Please accept bare mortal',
//     }).then(() => {
//       Contacts.getAll().then((res) => console.log(res));
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   return (
//     <View>
//       <Text>This contacts Page</Text>
//     </View>
//   );
// };

// export default ContactsChooser;
