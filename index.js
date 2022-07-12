/**
 * @format
 */

import { AppRegistry } from 'react-native'
import Home from './src/screens/Home'
import Navigator from './src/Navigator'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => Navigator)

