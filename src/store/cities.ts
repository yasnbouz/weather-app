import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface IWeatherData {
  current: {
    date: string
    locationName: string
    temperature: { current: string; min: string; max: string }
    wind: string
    humidity: string
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
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})

export const useCityStore = createStore<State[]>({
  state: {
    cities: []
  },
  mutations: {
    saveLocation(state, payload: IWeatherData) {
      const location = payload.current.locationName
      const founded = state.cities.find(
        (city: IWeatherData) => city.current.locationName === location
      )
      if (!founded) {
        state.cities.push(payload)
      }
    },
    deleteLocation(state, payload) {}
  },
  plugins: [vuexLocal.plugin]
})
