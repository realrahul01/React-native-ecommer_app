  import { StyleSheet, Text, View } from 'react-native'
  import React from 'react'
  import ProductDetail from '../Screens/ProductDetail'
  import { createNativeStackNavigator } from '@react-navigation/native-stack'
  import Home from '../Screens/Home'
  import Cart from '../Screens/Cart'
  import SignUp from '../Screens/SignUp'
  import TabNavigation from './TabNavigation'
  import Login from '../Screens/Login'
  import LandingScreen from '../Screens/LandingScreen'

  const StackNavigation = () => {

  const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="landingScreen" >
          <Stack.Screen name="signup" component={SignUp}/>
          <Stack.Screen name="landingScreen" component={LandingScreen}/>
          <Stack.Screen name="login" component={Login}/>
          <Stack.Screen name="main" component={TabNavigation} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="cartItem" component={Cart} />
      </Stack.Navigator>
    )
  }

  export default StackNavigation

  const styles = StyleSheet.create({})