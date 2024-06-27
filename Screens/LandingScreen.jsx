import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LandingScreen = () => {
const navigation = useNavigation()

const checkDetails = async()=>{
    
}


const getData= async()=>{
    const isLogin = await AsyncStorage.getItem('isLoggedIn')
    console.log(isLogin)
    if(isLogin == 'true'){
        navigation.navigate('main')
    }else{
        navigation.navigate('signup')
    }
}

useEffect(()=>{
    setTimeout(()=>{
        getData()
    },3000)
},[])

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{color:'black', fontSize:25, fontWeight:'bold'}}> ShopNow.com </Text>
        <Image
            source={require('../assets/Load_more-amico.png')}
            style={styles.img}
        />
        <ActivityIndicator size="large" color="red"/>
    </SafeAreaView>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width: '100%',
        height: '50%'
    }
})