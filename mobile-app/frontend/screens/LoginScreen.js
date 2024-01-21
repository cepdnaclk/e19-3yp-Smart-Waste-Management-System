import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginScreenPublic from './LoginScreenPublic'
import LoginScreenCollector from './LoginScreenCollector'

const LoginScreen = ({ navigation, initialOrder }) => {

  return (
    
    <ScrollView>
      <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[{flex:1}, {height: Dimensions.get('window').height}]}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          <LoginScreenPublic navigation={navigation} />
          <LoginScreenCollector navigation={navigation} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
      
      
         
  )
}

export default LoginScreen

