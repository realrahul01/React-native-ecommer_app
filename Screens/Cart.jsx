import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addQuantityHandler, minusQuantityHandler, removeHandler } from '../Features/CounterSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Cart = () => {

const cartItem = useSelector((state)=>state.cart.cartData)
console.log(cartItem)

const navigation = useNavigation()

const dispatch = useDispatch()

const incrementHandler=(x)=>{
  dispatch(addQuantityHandler(x))
}

const decrementHandler=(x)=>{
  if(x.quantity > 1){
    dispatch(minusQuantityHandler(x))
  }
}

// add total price
const totalPrice = cartItem.reduce((accumulator, currentValue)=>{
  return accumulator + currentValue.price * currentValue.quantity
}, 0)


const deleteHandler=(index)=>{
  dispatch(removeHandler(index))
  Toast.show({
    type: 'success',
    text1: 'item is removed from  the cart'
  })
}

const placeHandler = () => {
  Alert.alert(
    "Success",
    "Your order is placed successfully",
    [
      {
        text: "OK",
        onPress: () => navigation.navigate('Home')
      }
    ],
    { cancelable: false }
  );
};

  return (
    <ScrollView style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center', margin: 10}}>
          <AntDesign name="leftcircleo" color="black" size={40} onPress={()=>navigation.navigate('Home')}/>
          <Text style={{color:'black', marginHorizontal:100, fontSize:25}}> My Cart </Text>
        </View>

          {cartItem.map((x,index)=>(
            <View key={index} style={styles.cart_container}>
              <View style={{flexDirection:'row'}}>
                  <Image
                    source={{uri:x.image}}
                    style={styles.cart_img}
                  />
                      <View style={styles.cart_detail}>
                          <Text style={styles.cart_title}> {x.title.slice(0,11)}... </Text>
                          <View style={styles.rating_sec}>
                              <Entypo name="star" color="gold" size={17} />
                              <Entypo name="star" color="gold" size={17} />
                              <Entypo name="star" color="gold" size={17} />
                              <Entypo name="star" color="gold" size={17} />
                              <EvilIcons name="star" color="gold" size={17} />
                              <Text style={{color:'black', fontWeight:'bold'}}> {x.rating.rate} Ratings</Text>
                      </View>
                          <Text style={styles.cart_price}> ${x.price} </Text>

                      <Pressable style={styles.btn_section}>
                          <Pressable>
                            <AntDesign name="pluscircle" color="black" size={30} onPress={()=>incrementHandler(x)} />
                          </Pressable>
                          <Text style={styles.qty_section}> {x.quantity} </Text>
                          <Pressable>
                            <AntDesign name="minuscircle" color="black" size={30} onPress={()=>decrementHandler(x)} />
                          </Pressable>
                      </Pressable>

                      </View>
                  </View>

                   <View style={styles.deleteItem}>
                        <MaterialCommunityIcons name="delete" color="red" size={30} onPress={()=>deleteHandler(index)} />
                   </View>
            </View>
          ))}

          <View style={{marginHorizontal: 20, marginVertical: 15}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 7}}>
                  <Text style={{color:'grey', fontSize: 18}}>Total: </Text>
                  <Text style={{color:'grey', fontSize: 18}}> ${totalPrice} </Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 7}}>
                  <Text style={{color:'grey',fontSize: 18}}>shopping: </Text>
                  <Text style={{color:'grey',fontSize: 18}}> $0.00 </Text>
              </View>
              <Text style={styles.horizontal_line}> </Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 7}}>
                  <Text style={{color:'grey', fontSize: 18}}>Grand Total: </Text>
                  <Text style={{color:'black',fontSize: 18, fontWeight:'bold'}}> ${totalPrice} </Text>
              </View>
              <TouchableOpacity style={styles.checkOut} onPress={placeHandler}>
                <Text style={{textAlign:'center', color:'#fff', fontWeight:'bold', fontSize:18}}>Place Order</Text>
              </TouchableOpacity>
          </View>

    </ScrollView>
  )
}

export default Cart

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#fff'
  },

  cart_img:{
    aspectRatio: 4/5,
    height: 140,
    borderRadius: 10
  },
  cart_container:{
    elevation: 4,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cart_detail:{
    padding: 10
  },
  deleteItem:{
    paddingVertical: 10
  },
  cart_title:{
    color: 'black',
    fontWeight: 'bold',
    fontSize:17,
  },
  cart_price:{
    color: 'black',
    fontWeight: 'bold',
    fontSize:17,
    marginTop: 8,
    
  },
  rating_sec:{
    flexDirection: 'row',
    marginTop: 8,
  },
  btn_section:{
    flexDirection:'row',
    marginVertical:10,
    alignItems:'center'
  },
  qty_section:{
    color:'black',
    marginHorizontal: 7
  },
  horizontal_line:{
    height: 2,
    width: '100%',
    backgroundColor: '#99817f',
    marginVertical: 6
  },
  checkOut:{
    padding: 15,  
    backgroundColor: '#cb202d',
    borderRadius: 10,
    marginVertical:15
  }

})