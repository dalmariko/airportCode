<template>
  <div class="home">
    <preloader />

    <button @click="logout">Logout</button>

    <table>
      <th v-for="(field, name, index) in Fields" :key="index">
        {{ field }}
      </th>
      <tr v-for="(items, name, index) in AirportData" :key="index">
        <td v-for="item in items" :key="item.id">
          {{ item }}
        </td>
      </tr>
    </table>

    <pagination />
<!--    <autocomplete
      :items="items"
     :value="item"
      :get-label="getLabel"
      :component-item='template'
      @change="getCities"
    ></autocomplete>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import Pagination from './components/pagination'
import Preloader from './components/preloader'
// import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
// import ItemTemplate from './components/ItemTemplate'

// class Query {
//   constructor (url, settings) {
//     this.url = url
//     this._settings = Object.assign(Query.getDefaultSettings(), settings)
//   }
//
//   get get () {
//     return new Promise((resolve, reject) => {
//       fetch(this.url)
//         .then(response => response.json())
//         .then(resBody => resolve(resBody))
//         .catch(err => reject(err))
//     })
//   }
//
//   static getDefaultSettings () {
//     return {
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, cors, *same-origin
//       cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'omit', // include, *same-origin, omit
//       headers: {
//         Accept:
//           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//         'Content-Type': 'application/json',
//         'Accept-Language': 'u-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
//         'Accept-Encoding': 'gzip, deflate, br',
//         'Accept-Charset': 'utf-8',
//         'Keep-Alive': '300',
//         Connection: 'keep-alive',
//         DNT: '1',
//         age: '60',
//         'Cache-Control': 'public, max-age=31536000, only-if-cached',
//         'Access-Control-Allow-Origin': '*'
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrer: 'no-referrer', // no-referrer, *client
//       body: JSON.stringify(this._settings) // тип данных в body должен соответвовать значению заголовка "Content-Type"
//     }
//   }
// }

export default {
  name: 'FlightInformation',
  components: {
    Preloader,
    Pagination
    // Autocomplete
  },
  data () {
    return {
      // item: { },
      // items: [],
      // template: ItemTemplate
    }
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    }
    // getCities (text) {
    //   // new Query('http://5d679dc26847d40014f662a0.mockapi.io/api/v1/cities').get
    //   new Query('http://5d67b9c16847d40014f66476.mockapi.io/api/v1/countries').get
    //     .then(data => {
    //       this.items = []
    //       data.forEach(i => {
    //         if (i.name.indexOf(text) !== -1) {
    //           this.items.push(i)
    //         }
    //       })
    //       console.log(this.items)
    //     })
    // },
    // getLabel (item) {
    //   return item.name
    // }
  },
  computed: {
    ...mapGetters(['AirportData', 'Fields'])
  },
  beforeCreate () {
    this.$store.dispatch('AirportDataInfo')
  }
}
</script>

<style scoped></style>
