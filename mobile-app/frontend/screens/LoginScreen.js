import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginScreenPublic from './LoginScreenPublic'
import LoginScreenCollector from './LoginScreenCollector'

const LoginScreen = ({navigation}) => {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        <LoginScreenPublic navigation={navigation}/>
        <LoginScreenCollector navigation={navigation}/>
    </ScrollView>     
  )
}

export default LoginScreen

const styles = StyleSheet.create({})