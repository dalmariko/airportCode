<template>
  <div class="home">

    <preloader/>

    <button @click="logout">Logout</button>

    <table>
      <th v-for="(field,name,index) in Fields" :key="index">
        {{field}}
      </th>
      <tr v-for="(items, name,index) in AirportData" :key="index">
        <td v-for="item in items " :key="item.id">
          {{item}}
        </td>
      </tr>
    </table>

    <pagination/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import Pagination from './components/pagination'
import Preloader from './components/preloader'

export default {
  name: 'FlightInformation',
  components: { Preloader, Pagination },
  data () {
    return {

    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  computed: {
    ...mapGetters([
      'AirportData',
      'Fields'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('AirportDataInfo')
  }
}
</script>

<style scoped>

</style>
