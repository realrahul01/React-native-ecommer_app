import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
const [eye, setEye] = useState(false)
const [user, setUser] = useState({
  name: '',
  email:'',
  password:''
})
const navigation = useNavigation()

const eyeHandler=()=>{
  setEye(!eye)
}

const asyncStorageData = async()=>{
    await AsyncStorage.setItem('userDetail', JSON.stringify(user))
}


const signUpHandler = ()=>{
  const {name, email, password} = user

  if(name !== '' && email !== '' && password !==''){
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailRegex.test(email)){
          Toast.show({
            type:'error',
            text1:'Please enter a valid email',
            visibilityTime:1500,
          })
      }
      else if(password.length < 5){
        Toast.show({
          type:'error',
          text1:'Password must be greater than 5 character',
          visibilityTime:1500,
        })
      }

      else{
          setUser({name:'',email:'',password:''})
          asyncStorageData()
          Toast.show({
            type:'success',
            text1: 'Register Successfully',
            visibilityTime:1500,
            onHide:()=>{
              navigation.navigate('login')
            }
          })
      }
  }else{
    Toast.show({
      type:'error',
      text1: 'Please enter all the details',
      visibilityTime:1500,
    })
  }

  console.log(user)

}

  return (
    <SafeAreaView style={styles.container}>
        <Ionicons name="arrow-back-circle-sharp" color="black" size={35} style={{alignSelf:'flex-start'}}/>
          <Image
            source={require('../assets/Reset-password-pana.png')}
            style={styles.signupImg}
          />
          <View style={styles.main_container}>

              <View style={styles.signUp_inp}>

              <View style={styles.secInp}>
                  <Text style={{color:'black'}}>Name</Text>
                  <View style={styles.inp_sec}>
                    <FontAwesome5 name="user-alt" color="black" size={25}/>
                        <TextInput
                          placeholder='Name'
                          placeholderTextColor = "grey"
                          style={styles.inp}
                          value={user.name}
                          onChangeText={(text)=> setUser({...user, name:text})}
                        />
                  </View> 
              </View>
              <View style={styles.secInp}>
                  <Text style={{color:'black'}}>Email</Text>
                  <View style={styles.inp_sec}>
                    <Fontisto name="email" color="black" size={25}/>
                        <TextInput
                          placeholder='Email'
                          placeholderTextColor = "grey"
                          style={styles.inp}
                          value={user.email}
                          onChangeText={(text)=> setUser({...user, email:text})}
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
                          secureTextEntry = {eye ? false : true}
                          value={user.password}
                          onChangeText={(text)=> setUser({...user, password:text})}
                        />
                        {eye && (
                          <Entypo name="eye" color='black' size={30} onPress={eyeHandler}/>
                        )}
                        {!eye && (
                          <Entypo name="eye-with-line" color='black' size={30} onPress={eyeHandler} />
                        )}
                  </View> 
              </View>

                <TouchableOpacity style={styles.btn} onPress={signUpHandler} >
                    <Text style={{color:'black', textAlign:'center', fontWeight:'bold'}}>Sign Up</Text>
                </TouchableOpacity>

                  <Text style={styles.orr}> Or </Text>

                  <View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:30}}>
                        <Icon name="google" color='black' size={30}  />
                        <Icon name="apple1" color='black' size={30}  />
                        <Icon name="facebook-square" color='black' size={30}  />
                        
                  </View>

                  <Text style={{color:'black', textAlign:'center'}}> Already Have an Account? <Text style={{color:'#F3B431'}} onPress={()=> navigation.navigate('login')}> Log in </Text>  </Text>


              </View>


          </View>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#BAB0CB',
    alignItems:'center'
  },
  signupImg:{
    width: 300,
    height:200
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
    borderRadius: 10,
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
    backgroundColor:'#F3B431'
  },
  orr:{
    color:'black',
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 18,
  },
  secInp:{
    marginVertical:8
  }



})