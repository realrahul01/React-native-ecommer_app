import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
const [eye, setEye] = useState(false)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


const navigation = useNavigation()

const eyeHandler=()=>{
  setEye(!eye)
}



const loginHandler = async () => {
  try {
    const user = await AsyncStorage.getItem('userDetail')
    const parsedData = JSON.parse(user)
    
    if (email !== '' && password !== '') {
      if (parsedData.email !== email || parsedData.password !== password) {
        Toast.show({
          type: 'error',
          text1: "Email or password doesn't match",
          visibilityTime:1500,
        })
      } else {
        Toast.show({
          type: 'success',
          text1: "Login successful",
          visibilityTime:2000,
          onHide:()=>{
            navigation.navigate('main')
          }
        })
        setEmail('')
        setPassword('')
        await AsyncStorage.setItem('isLoggedIn', 'true')
      }
    } else {
      Toast.show({
        type: 'error',
        text1: "Please enter all details",
        visibilityTime:1500,
      })
    }
  } catch (e) {
    console.error(e)
    Toast.show({
      type: 'error',
      text1: "An error occurred while logging in",
      visibilityTime:1500,
    })
  }
}


  return (
    <SafeAreaView style={styles.container}>
        <Ionicons name="arrow-back-circle-sharp" color="black" size={35} style={{alignSelf:'flex-start'}}/>
          <Image
            source={require('../assets/Computer-login-bro.png')}
            style={styles.signupImg}
          />
          <View style={styles.main_container}>

              <View style={styles.signUp_inp}>

              <View style={styles.secInp}>
                  <Text style={{color:'black'}}>Email</Text>
                  <View style={styles.inp_sec}>
                    <Fontisto name="email" color="black" size={25}/>
                        <TextInput
                          placeholder='Email'
                          placeholderTextColor = "grey"
                          style={styles.inp}
                          value={email}
                          onChangeText={(text)=>setEmail(text)}
                        />
                  </View> 
              </View>
              <View style={styles.secInp}>
                  <Text style={{color:'black'}}>Password</Text>
                  <View style={styles.inp_sec}>
                        <TextInput
                          placeholder='Password'
                          placeholderTextColor = "grey"
                          style={styles.inp1}
                          secureTextEntry={eye ? false : true}
                          value={password}
                          onChangeText={(text)=>setPassword(text)}
                        />
                        {eye && (
                          <Entypo name="eye" color='black' size={30} onPress={eyeHandler}/>
                        )}
                        {!eye && (
                          <Entypo name="eye-with-line" color='black' size={30} onPress={eyeHandler} />
                        )}
                  </View> 
              </View>

                <TouchableOpacity style={styles.btn} onPress={loginHandler} >
                    <Text style={{color:'black', textAlign:'center', fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>

                  <Text style={styles.orr}> Or </Text>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:30}}>
                        <Icon name="google" color='black' size={30}  />
                        <Icon name="apple1" color='black' size={30}  />
                        <Icon name="facebook-square" color='black' size={30}  />
                        
                  </View>

                  <Text style={{color:'black', textAlign:'center'}}> Already Have an Account? <Text style={{color:'#F3B431'}} onPress={()=>navigation.navigate('signup')} > Sign Up </Text>  </Text>


              </View>


          </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#BAB0CB',
    alignItems:'center'
  },
  signupImg:{
    width: 180,
    height:180
  },
  
  main_container:{
    height: '100%',
    width: '100%',
    backgroundColor:'#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  signUp_inp:{
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 20,
  },
  inp:{
    width: '100%' ,
    paddingHorizontal:8,
    color:'black'
  },
  inp_sec:{
    borderWidth: 1,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:5,
    borderRadius: 10
  },
  inp1:{
    width: '90%' ,
    paddingHorizontal:5,
    color:'black',
  },
  btn:{
    marginVertical:40,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor:'#F3B431',
  },
  orr:{
    color:'black',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 18,
  },
  secInp:{
    marginVertical:10
  }



})