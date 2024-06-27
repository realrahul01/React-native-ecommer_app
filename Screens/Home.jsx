import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import MyCarousel from "../components/MyCarousel";
import Products from "../components/Products";

const Home=()=>{


    return(
        <SafeAreaView>
                {/* header section */}
                   <Header/>

                <ScrollView style={styles.scroll_sec}>
                {/* carousel section */}
                    <MyCarousel/>


                {/* product items section */}
                    <Products/>

                </ScrollView>

        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
})