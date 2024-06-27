import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FavouriteItem from '../Screens/FavouriteItem';
import Cart from '../Screens/Cart';
import { useSelector } from 'react-redux';
import StackNavigation from './StackNavigation';


const TabNavigation = () => {
const favItem = useSelector((state)=>state.cart.favouriteData)
const cartItem = useSelector((state)=>state.cart.cartData)

const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
       name="Home" 
       component={Home} 
       options={{
        tabBarIcon:({size, focused, color})=>{
            return <Entypo name="home" color="black" size={30} />
        }
       }}
      />
      <Tab.Screen
       name="Favourite" 
       component={FavouriteItem} 
       options={{
        tabBarIcon:({size, focused, color})=>{
            return (
                <View style={styles.fav_icon}>
                    <FontAwesome name="heart" color="#cb202d" size={30} />
                    {favItem.length > 0 && (
                        <View style={styles.fav_length}>
                            <Text style={{color:'#fff'}}> {favItem.length} </Text>
                        </View>
                    )}
                </View>
            )
        }
       }}
      />
      <Tab.Screen
       name="Cart" 
       component={Cart} 
       options={{
        tabBarIcon:({size, focused, color})=>{
            return (
                <View>
                    <AntDesign name="shoppingcart" color="black" size={30} />
                    {cartItem.length > 0 && (
                        <View style={styles.cart_length}>
                            <Text style={{color:'#fff'}}> {cartItem.length} </Text>
                        </View>
                    )}
                </View>
            )
        }
       }}
      />
      <Tab.Screen
       name="Profile" 
       component={Home} 
       options={{
        tabBarIcon:({size, focused, color})=>{
            return (
                <Image
                    source={require('../assets/Screenshot_2024_0523_163845.jpg')}
                    style={styles.profile_pic}
                />
            )
        }
       }}
      />
      
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
    profile_pic:{
        width:35,
        height:35,
        borderRadius:30
    },
    fav_length:{
        position: 'absolute',
        color:'#fff',
        width: 20,
        height:20,
        right: -13,
        top:-2,
        backgroundColor:'red',
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    cart_length:{
        position: 'absolute',
        color:'#fff',
        width: 20,
        height:20,
        right: -13,
        top:-2,
        backgroundColor:'red',
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center'
    }
})