import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getIcon } from '../common'

export default props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.date.substring(11, 13)}</Text>
      <View style={{ alignItems: 'center' }}>
        <Image source={getIcon(props.icon)[0]} />
        {props.precipitationProbability ? (
          <Text style={{ color: '#55F', fontSize: 12 }}>
            <Icon name="water" />
            {props.precipitationProbability}%
          </Text>
        ) : (
          false
        )}
      </View>
      <Text style={styles.text}>{props.temp}° </Text>
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
