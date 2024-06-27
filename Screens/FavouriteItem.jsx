import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const FavouriteItem = () => {
const favItem = useSelector((state)=>state.cart.favouriteData)

const navigation = useNavigation()

  return (
    <SafeAreaView>
      <ScrollView>
      
      <View style={{flexDirection:'row', alignItems:'center', margin: 10}}>
          <AntDesign name="leftcircleo" color="black" size={40} style={styles.backIcon} onPress={()=>navigation.navigate('Home')}/>
          <Text style={{color:'black', marginHorizontal:100, fontSize:25}}> Favourite </Text>
        </View>

      {favItem.map((x,index)=>(
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

                      </View>
                  </View>
            </View>
          ))}

        </ScrollView>
    </SafeAreaView>
  )
}

export default FavouriteItem

const styles = StyleSheet.create({
  cart_container:{
    elevation: 4,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cart_img:{
    aspectRatio: 4/5,
    height: 140,
    borderRadius: 10
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
})