import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Appearance,
  TouchableOpacity,
  FlatList,
  // useColorScheme
} from 'react-native'
import CityCard from '../components/CityCard'

import WeatherContext from '../context/WeatherContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default class SearchCity extends Component {
  state = {
    newCityName: '',
  }

  addCity = cityName => {
    console.log(cityName)
    if (cityName.trim()) {
      this.context.addCity(cityName.trim())
      this.setState({ newCityName: '' })
    } else {
      console.warn('Cidade inválida', 'Insira um nome válido')
    }
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tempo</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputCity}
            value={this.state.newCityName}
            onChangeText={cityName =>
              this.setState({ newCityName: cityName })
            }></TextInput>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => this.addCity(this.state.newCityName)}>
            <Text style={styles.searchButtonText}>
              <MaterialIcons
                name="add"
                size={30}
                color={bgColor}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '90%', flex: 1 }}>
          <FlatList
            data={this.context.state.cityList}
            keyExtractor={item => item.cityCode}
            renderItem={({ item }) => <CityCard {...item} />}
            style={{ alignContent: 'center' }}
          />
        </View>
      </View>
    )
  }
}

SearchCity.contextType = WeatherContext

let isDarkMode = Appearance.getColorScheme() === 'dark'
let bgColor = isDarkMode ? 'black' : 'white'
let secondaryColor = isDarkMode ? 'white' : 'black'

const styles = StyleSheet.create({
  main: {
    backgroundColor: bgColor,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 20,
  },
  inputCity: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    flex: 8,
    height: 35,
  },
  searchButton: {
    flex: 2,
    backgroundColor: secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  searchButtonText: {
    color: bgColor,
  },
})
