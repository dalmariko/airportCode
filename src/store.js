import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class Query {
  constructor (url, settings) {
    this.url = url
    this._settings = Object.assign(Query.getDefaultSettings(), settings)
  }

  get get () {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then(response => response.json())
        .then(resBody => resolve(resBody))
        .catch(err => reject(err))
    })
  }

  static getDefaultSettings () {
    return {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/json',
        'Accept-Language': 'u-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Charset': 'utf-8',
        'Keep-Alive': '300',
        'Connection': 'keep-alive',
        'DNT': '1',
        'age': '60',
        'Cache-Control': 'public, max-age=31536000, only-if-cached',
        'Access-Control-Allow-Origin': '*'
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(this._settings) // тип данных в body должен соответвовать значению заголовка "Content-Type"
    }
  }
}

export default new Vuex.Store({
  state: {
    info: [],
    selectPage: 1,
    maxpages: null,
    fields: [],
    preloader: true,
    twostepleft: false,
    twostepright: false,
    onestepleft: false,
    onestepright: false,
    activePage: 1
  },
  getters: {
    AirportData: state => state.info,
    Fields: state => state.fields,
    Preloader: state => state.preloader,
    MaxPages: state => state.maxpages,
    SelectPage: state => state.selectPage,
    ActivePage: state => state.activePage,
    StatusTwoStepRight: state => state.twostepright,
    StatusTwoStepLeft: state => state.twostepleft,
    StatusOneStepRight: state => state.onestepright,
    StatusOneStepLeft: state => state.onestepleft
  },
  mutations: {
    AirportDataInfo: (state, payload) => {
      state.info = payload
    },
    SelectPage: (state, payload) => {
      state.selectPage = payload
    },
    MaxPages: (state, payload) => {
      state.maxpages = payload
    },
    Fields: (state, payload) => {
      state.fields = payload
    },
    Preloader: (state, payload) => {
      state.preloader = payload
    },
    StatusTwoStepRight: (state, payload) => {
      state.twostepright = payload
    },
    StatusTwoStepLeft: (state, payload) => {
      state.twostepleft = payload
    },
    StatusOneStepRight: (state, payload) => {
      state.onestepright = payload
    },
    StatusOneStepLeft: (state, payload) => {
      state.onestepleft = payload
    },
    ActivePage: (state, payload) => {
      state.activePage = payload
    }
  },
  actions: {
    SelectPage: (context, payload) => {
      return context.commit('SelectPage', payload)
    },
    MaxPages: (context, payload) => {
      return context.commit('MaxPages', payload)
    },
    Fields: (context, payload) => {
      return context.commit('Fields', payload)
    },
    Preloader: (context, payload) => {
      return context.commit('Preloader', payload)
    },
    StatusTwoStepRight: (context, payload) => {
      return context.commit('StatusTwoStepRight', payload)
    },
    StatusTwoStepLeft: (context, payload) => {
      return context.commit('StatusTwoStepLeft', payload)
    },
    StatusOneStepRight: (context, payload) => {
      return context.commit('StatusOneStepRight', payload)
    },
    StatusOneStepLeft: (context, payload) => {
      return context.commit('StatusOneStepLeft', payload)
    },
    ActivePage: (context, payload) => {
      return context.commit('ActivePage', payload)
    },
    AirportDataInfo: (context, payload) => {
      let uri = `${process.env.VUE_APP_API_URL}?page=${payload}&limit=${10}`
      context.commit('Preloader', true)
      new Query(uri).get
        .then(data => {
          return data
        })
        .then(data => {
          context.commit('MaxPages', data['total'] = 10)
          context.commit('Fields', Object.getOwnPropertyNames(data['0']))
          context.commit('AirportDataInfo', data)
        })
        .then(() => {
          context.commit('Preloader', false)
        })
    }
  }
})
