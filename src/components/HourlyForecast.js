import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.hour}</Text>
      <Icon
        name="cloud"
        size={40}
        color="#FFF"
      />
      <Text style={styles.text}>{props.temp}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 80,
    height: '100%',
  },
  text: {
    color: 'white',
  },
})
