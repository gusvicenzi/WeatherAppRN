import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

// import Icon from 'react-native-vector-icons/MaterialIcons'
import { getIcon } from '../common'

export default props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.date.substring(11, 13)}</Text>
      <Image source={getIcon(props.icon)[0]} />
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
