import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from './store/app'
import Toast from 'react-native-toast-message'
import StackNavigation from './Navigation/StackNavigation'

const App = () => {


  return (
    <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer>
          <StackNavigation/>
          <Toast/>
      </NavigationContainer>
    </View>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff'
  }
})