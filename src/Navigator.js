import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'

import Home from './screens/Home'
import SearchCity from './screens/SearchCity'
import { WeatherProvider } from './context/WeatherContext'

const Tab = createBottomTabNavigator()

const LocalWeather = () => {
  return (
    <View>
      <Text>LOCAL WEATHER TAB</Text>
    </View>
  )
}

export default Navigator = () => {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SearchCity">
          <Tab.Screen
            name="Home"
            component={Home}
          />
          <Tab.Screen
            name="SearchCity"
            component={SearchCity}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  )
}
