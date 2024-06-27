import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';

const Header = () => {
  const [userDetail, setUserDetail] = useState(null);

const navigation = useNavigation()

useEffect(() => {
  const fetchUserDetail = async () => {
    try {
      const userName = await AsyncStorage.getItem('userDetail');
      const parsedData = userName ? JSON.parse(userName) : null;
      setUserDetail(parsedData);
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  fetchUserDetail();
}, []);

const logoutHandler= ()=>{
  Toast.show({
    type:'success',
    text1:'Logout successfully',
    visibilityTime: 1500,
    onHide: async()=>{
      await AsyncStorage.setItem('isLoggedIn', 'false')
      navigation.navigate('login')
    }
  })
}


  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.navbar}>
            <View style={styles.left_nav}>
              <Entypo name="location-pin" size={35} color="white" />
                <View style={styles.left_nav_text}>
                    <Text style={styles.name}>Welcome {userDetail ? userDetail.name : 'Guest'}</Text>
                    <Text style={styles.address}> B-130, Rohini sec-23, Delhi-110086</Text>
                </View>
            </View>
            <View style={styles.right_nav}>
              <MaterialCommunityIcons name="logout" size={35} color="white" onPress={logoutHandler} />
              <Text style={{color:'#fff'}}> Logout </Text>
            </View>
        </View>

              <View style={styles.search}>
                  <AntDesign name="search1" size={25} color="grey" />
                  <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    
                  />
              </View>

    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#cb202d',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    navbar:{
      flexDirection:'row',
      justifyContent:'space-between',
      padding:15
    },
    left_nav:{
      flexDirection:'row',
    },
    search:{
      flexDirection:'row',
      backgroundColor:'#fff',
      color:'black',
      marginHorizontal:20,
      marginVertical:10,
      borderRadius:10,
      paddingHorizontal:15,
      alignItems:'center'
    },
    input:{
      color:'black',
      width: '100%'
    },
    left_nav_text:{
      marginHorizontal:2
    },
    name:{
      color:'#fff',
      fontSize:17,
      fontWeight: '800'
    },
    address:{
      color:'#fff',
      fontWeight:'bold'
    }
})