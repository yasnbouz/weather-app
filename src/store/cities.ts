import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, type Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface IWeatherData {
  current: {
    date: string
    locationName: string
    temperature: { current: string; min: string; max: string }
    wind: string
    humidity: number
    pressure: string
    percipitation: string
    iconURL: string
    description: string
    status: string
  }
  hourly: any[]
  upcoming: any[]
}
interface State {
  cities: IWeatherData[]
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

//  localStorage
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})
// store
export const citiesStore = createStore<State>({
  state: {
    cities: []
  },
  getters: {
    isSaved: (state: State) => (payload: string) => {
      return !!state.cities.find((city: IWeatherData) => city.current.locationName === payload)
    }
  },
  mutations: {
    saveLocation(state: State, payload: IWeatherData) {
      const location = payload.current.locationName
      const founded = state.cities.find((city: IWeatherData) => city.current.locationName === location)
      if (!founded) {
        state.cities.push(payload)
      }
    },
    deleteLocation(state: State, payload: string) {
      if (payload) {
        console.log(payload)
        state.cities = state.cities.filter((city) => city.current.locationName !== payload)
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
export function useStore() {
  return baseUseStore(key)
}
