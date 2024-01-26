import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginScreenPublic from './LoginScreenPublic'
import LoginScreenCollector from './LoginScreenCollector'

const LoginScreen = ({ navigation }) => {

  const scrollView = useRef();


  return (
    
    
      <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[{flex:1}, {height: Dimensions.get('window').height}]}>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <LoginScreenPublic
            navigation={navigation}
            onPressPublic={() => scrollView.current.scrollTo({ x: 0 })}
            onPressCollector={() => scrollView.current.scrollTo({x: Dimensions.get('window').width})}
          />
          <LoginScreenCollector
            navigation={navigation}
            onPressPublic={() => scrollView.current.scrollTo({ x: 0 })}
            onPressCollector={() => scrollView.current.scrollTo({x: Dimensions.get('window').width})}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      
      
         
  )
}

export default LoginScreen

