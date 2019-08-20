<template>
  <div class="home">

    <div id="preloader" v-show="StatusPreloader"></div>

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

export default {
  name: 'FlightInformation',
  components: { Pagination },
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
      'Fields',
      'StatusPreloader'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('AirportDataInfo')
  }
}
</script>

<style scoped>

  @-webkit-keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  #preloader {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 48px;
    height: 48px;
    margin-left: -24px;
    margin-top: -24px;
    border: #31a9df 3px solid;
    border-left-color: transparent;
    border-radius: 50%;
    -webkit-animation: rotating 1s linear infinite;
  }

</style>
