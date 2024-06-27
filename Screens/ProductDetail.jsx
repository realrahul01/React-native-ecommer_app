import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useDispatch } from 'react-redux';
import { handleCart } from '../Features/CounterSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const ProductDetail = ({route}) => {
const {product} = route.params

const navigation = useNavigation()

const dispatch = useDispatch()

  const addToCartHandler=()=>{
    dispatch(handleCart(product))
    Toast.show({
      type: 'success',
      text1: 'item is successfully added into cart',
      visibilityTime:1000
    })
  }

  const goToCartHandler=()=>{
      navigation.navigate('cartItem')
  }


  return (
    <SafeAreaView>
        <ScrollView>
        <ImageBackground 
        source={{uri: product.image}}
        style={styles.product_img}
        >
        <AntDesign name="leftcircle" color="black" size={40} style={styles.backIcon} onPress={()=>navigation.navigate('Home')} />
      </ImageBackground>

      <View style={styles.product_detail}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', margin:10}}>
            <Text style={{color:'black', fontSize:20, fontWeight: 'bold' }}> {product.title.slice(0,11)}... </Text>
            <Text style={{color:'black', fontSize:20, fontWeight: 'bold'}}> ${product.price} </Text>
          </View>

          <View style={styles.rating_sec}>
              <Entypo name="star" color="gold" size={17} />
              <Entypo name="star" color="gold" size={17} />
              <Entypo name="star" color="gold" size={17} />
              <Entypo name="star" color="gold" size={17} />
              <EvilIcons name="star" color="gold" size={17} />
              <Text style={{color:'black', fontWeight:'bold'}}> {product.rating.rate} Ratings</Text>
          </View>

          <View style={styles.description_pro}>
              <Text style={styles.des_title}> Description </Text>
              <Text style={styles.des_product}> {product.description} </Text>
          </View>

        <TouchableOpacity style={[styles.cart_btn, styles.btn1]} onPress={addToCartHandler}>
              <Text style={styles.Cart_stl}> Add To Cart </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cart_btn} onPress={goToCartHandler}>
              <Text style={styles.Cart_stl}> Go To Cart </Text>
        </TouchableOpacity>

      </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  product_img:{
    width: '100%',
    height: 380,
    backgroundColor:'black'
  },
  backIcon:{
    margin:10,
  },
  product_des:{
    borderWidth: 1,
  },
  rating_sec:{
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
    margin:10
  },
  description_pro:{
    margin: 10
  },
  des_title:{
    color:'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  des_product:{
    color: 'black', 
    fontSize:17,
  },
  cart_btn:{
    margin: 10,
    padding: 15,  
    backgroundColor: '#fc9403',
    borderRadius: 30
  },
  Cart_stl:{
    color: 'black',
    textAlign:'center',
    fontWeight: '400',
    fontSize:17
  },
  btn1:{
    backgroundColor: '#fce703'
  }
})