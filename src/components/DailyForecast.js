import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.day}</Text>
      <Icon
        name="cloud"
        size={40}
        color="#FFF"
      />
      <Text style={styles.text}>Mín.: {props.minTemp}°</Text>
      <Text style={styles.text}>Máx.: {props.maxTemp}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 50,
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 1,
  },
  text: {
    color: 'white',
  },
})
