import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'

const MyCarousel = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:2, marginVertical:10, alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20, fontWeight:'bold'}}>#SpecialForYou</Text>
            <Text style={{color:'black'}}>See All</Text>
        </View>
        
        <Swiper style={styles.wrapper}
            autoplay
            dotStyle={styles.paginationDot}
            paginationStyle={styles.pagination}
            activeDotStyle = {styles.activeDot}
            ImageComponentStyle={{borderRadius: 10}}
        >
        <View style={styles.slide}>
          <Image
            source={{
                uri: "https://images.template.net/65401/Flash-Sale-Billboard-Template-sm-fs-1645020195925-13630810.jpeg"
            }}
            style={styles.img1}
          />
        </View>
        <View style={styles.slide}>
        <Image
            source={{
              uri: "https://th-i.thgim.com/public/incoming/zhwfm1/article65921512.ece/alternates/LANDSCAPE_1200/amazon-hindu-ad.jpg"
            }}
            style={styles.img1}
          />
        </View>
        <View style={styles.slide}>
        <Image
            source={{
              uri: "https://www.mjackets.com/wp-content/uploads/2023/06/Movie-Banner-Web.jpg"
            }}
            style={styles.img1}
          />
        </View>
      </Swiper>

    </SafeAreaView>
  )
}

export default MyCarousel

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        height: 250
    },
    wrapper: {},
    text: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold'
    },
    img1:{
      width:'100%',
      height: 200,
      borderRadius: 8,
    },
    pagination: {
      bottom: '5%', // Adjust this value to position the dots vertically
    },
    paginationDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: 'grey'
      // backgroundColor: 'rgba(0,0,0,.2)',
    },
    activeDot: {
      width: 10,
      height: 10,
      borderRadius: 6,
      marginHorizontal: 5,
      backgroundColor: '#fff',
    },

})