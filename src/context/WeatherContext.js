import React, { Component, createContext } from 'react'
import { initialState } from '../common'
import { initialCardState } from '../common'
import { generalInitialState } from '../common'

const WeatherContext = createContext({})

export class WeatherProvider extends Component {
  state = {
    ...generalInitialState,
  }

  addCity = newCity => {
    this.state.cityList.push(newCity)
  }

  render() {
    const { addCity } = this
    return (
      <WeatherContext.Provider value={{ state: this.state, addCity }}>
        {this.props.children}
      </WeatherContext.Provider>
    )
  }
}
export default WeatherContext
