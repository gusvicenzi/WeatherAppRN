import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Home from './screens/Home'
import WeatherCity from './components/WeatherCity'
import SearchCity from './screens/SearchCity'
import WeatherContext, { WeatherProvider } from './context/WeatherContext'

const Tab = createBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()

const TopTabWeathers = props => {
  // console.log(Object.keys(props))
  // console.log(props.route)

  const weather = useContext(WeatherContext)
  return (
    <TopTab.Navigator>
      {/* <TopTab.Screen
        name="Home"
        component={Home}
      /> */}
      <TopTab.Screen
        name="Home"
        component={Home}
      />
      <TopTab.Screen
        name="Primeira cidade"
        options={{ title: 'Primeira' }}>
        {props => (
          <WeatherCity
            {...props}
            index={0}
          />
        )}
      </TopTab.Screen>
      <TopTab.Screen
        name="Segunda cidade"
        options={{ title: 'Segunda' }}>
        {props => (
          <WeatherCity
            {...props}
            index={1}
          />
        )}
      </TopTab.Screen>
      {/* <TopTab.Screen
        name="Home2"
        component={Home}
      /> */}
    </TopTab.Navigator>
  )
}

export default Navigator = () => {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SearchCity">
          {/* <Tab.Screen
            name="Home"
            component={Home}
          /> */}
          <Tab.Screen
            name="Main"
            component={TopTabWeathers}
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
