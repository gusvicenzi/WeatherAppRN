import React from 'react'
import { View, Text } from 'react-native'

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome'

export default () => {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        backgroundColor: '#000',
      }}>
      <Text>Agora</Text>
      <FontAwesome5Icon
        name="home"
        size={40}
        color={'white'}
        solid
      />
    </View>
  )
}
