import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { favState, removeFavState } from '../Features/CounterSlice';
import Toast from 'react-native-toast-message';

const Products = () => {
const [list, setList] = useState([])
const [originalList, setOriginalList] = useState([])

const navigation = useNavigation()
const dispatch = useDispatch()


const handleClick=(item)=>{
    navigation.navigate('ProductDetail', {product: item})
}


    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then((res)=>res.json())
        .then((data)=>{
            const formatedData = data.map((x)=>(
                {...x, isSelected: false, quantity: 1}
            ))
            setList(formatedData)
            setOriginalList(formatedData)
        })
    },[])

    const favHandler=(item)=>{
        const updateHandler = list.map((x)=>{
            if(x.id == item.id){
                return {...x, isSelected: !x.isSelected}
            }else{
                return x
            }
        })
        setList(updateHandler)
        dispatch(favState(item))

        Toast.show({
            type:'success',
            text1: "Item is Successfully added into favourite",
            visibilityTime:1000
        })
    }


    const removeFavHandler=(item,index)=>{
        const updateHandler = list.map((x)=>{
            if(x.id == item.id){
                return {...x, isSelected: !x.isSelected}
            }else{
                return x
            }
        })
        dispatch(removeFavState(index))
        setList(updateHandler)
        Toast.show({
            type:'success',
            text1: "Item is removed from favourite",
            visibilityTime:1000
        })
    }

    const renderProductItems=({item,index})=> (
        <TouchableOpacity style={styles.productContainer} onPress={()=>handleClick(item)} >
            <Image
                source={{uri: item.image}}
                style={styles.shop_img}
            />
            <Text style={{color:'black'}}> {item.title.slice(0,11)}... </Text>
            <Text style={{color:'black'}}> ${item.price} </Text>
            <Text style={{color:'black'}}> ${item.category} </Text>
            
            <TouchableOpacity style={styles.heat_o}>
                {item.isSelected && (
                    <FontAwesome name="heart" color="#cb202d" size={25} onPress={()=>removeFavHandler(item,index)}/>
                )}
                {!item.isSelected && (
                    <FontAwesome name="heart-o" color="black" size={25} onPress={()=>favHandler(item)}/>
                )}
            </TouchableOpacity>
        </TouchableOpacity>
    )

    const menHandler=()=>{
        const val = originalList.filter((x)=>x.category == "men's clothing")
        setList(val)
    }
    const womenHandler=()=>{
        const val = originalList.filter((x)=>x.category == "women's clothing")
        setList(val)
    }
    const JeweleryHandler=()=>{
        const val = originalList.filter((x)=>x.category == "jewelery")
        setList(val)
    }
    const ElectronicsHandler=()=>{
        const val = originalList.filter((x)=>x.category == "electronics")
        setList(val)
    }

    const allHandler=()=>{
        const val = originalList.filter((x)=>x.category == "men's clothing" || "women's clothing" || "jewelery"||"electronics")
        setList(val)
    }


  return (
    <SafeAreaView style={styles.product_main}>
        <View style={styles.line_sec}>
            <Text style={styles.horizontal_line}></Text>
            <Text style={{color:'black', fontWeight:'bold', fontSize: 18}}>Products</Text>
            <Text style={styles.horizontal_line}></Text>
        </View>

        <ScrollView horizontal>
            <View style={styles.scroll_item}>
                <Text style={styles.all_items} onPress={allHandler} >All</Text>
                <Text style={styles.all_item} onPress={menHandler} >Men's Clothing</Text>
                <Text style={styles.all_item} onPress={womenHandler}>Women's clothing</Text>
                <Text style={styles.all_item} onPress={JeweleryHandler} >Jewelery</Text>
                <Text style={styles.all_item} onPress={ElectronicsHandler} >Electronics</Text>
            </View>
        </ScrollView>


        <FlatList
            data={list}
            renderItem={renderProductItems}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={2}
            style={styles.flatList_container}
            />
    
    </SafeAreaView>
  )
}

export default Products

const styles = StyleSheet.create({
    product_main:{
        flex: 1 
    },
    horizontal_line:{
        height: 1,
        backgroundColor:'#D0D0D0',
        width: 140,
        marginHorizontal: 10
    },
    line_sec:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    all_items:{
        color:'#fff',
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical:10,
        borderRadius: 30,
        backgroundColor:'#cb202d',
    },
    all_item:{
        color:'black',
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical:10,
        borderRadius: 30,
        borderWidth: 1
    },
    scroll_item:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    shop_img:{
        aspectRatio: 4/5,
        height: 180
    },
    productContainer:{
        flex:1,
        margin: 10,
        alignItems:'center',
        padding: 10,
        elevation:4,
        backgroundColor:'#fff',
    },
    heat_o:{
        position: 'absolute',
        right: 6,
        bottom: 10
    },
    flatList_container:{
        paddingBottom: 150
    }
    
})