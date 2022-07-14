import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
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

  const generateWeatherTabs = () => {
    let tabs = weather.state.cityList.map((city, i) => {
      return (
        <TopTab.Screen
          name={city.cityName}
          options={{ title: city.cityName }}
          key={city.cityCode}>
          {props => (
            <WeatherCity
              {...props}
              index={i}
            />
          )}
        </TopTab.Screen>
      )
    })
    return tabs
  }
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#059',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          position: 'absolute',
          paddingHorizontal: '20%',
          // flexDirection: 'column',
          width: '100%',
          marginHorizontal: 'auto',
          shadowColor: 'transparent',
        },
        tabBarIcon: ({ focused, color }) => {
          return (
            <MaterialIcons
              name="circle"
              size={15}
              color={color}
            />
          )
        },
      }}
      // tabBar={() => null}
      initialRouteName="Local">
      <TopTab.Screen
        name="Local"
        component={Home}
        options={{
          title: weather.state.local.cityName,
          tabBarIcon: ({ focused, color }) => {
            return (
              <MaterialIcons
                name="near-me"
                size={17}
                color={color}
              />
            )
          },
        }}
      />
      {generateWeatherTabs()}
      {/* <TopTab.Screen
        name="Primeira cidade"
        options={{ title: 'Primeira' }}>
        {props => (
          <WeatherCity
            {...props}
            index={0}
          />
        )}
      </TopTab.Screen>*/}
    </TopTab.Navigator>
  )
}

export default Navigator = () => {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{ headerShown: false, tabBarShowLabel: false }}
          initialRouteName="SearchCity">
          <Tab.Screen
            name="Main"
            component={TopTabWeathers}
            options={{
              tabBarIcon: ({ focused, color }) => {
                return (
                  <MaterialIcons
                    name="home"
                    size={25}
                    color={color}
                  />
                )
              },
            }}
          />
          <Tab.Screen
            name="SearchCity"
            component={SearchCity}
            options={{
              tabBarIcon: ({ focused, color }) => {
                return (
                  <MaterialIcons
                    name="search"
                    size={25}
                    color={color}
                  />
                )
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  )
}
