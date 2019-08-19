<template>
  <div class="home">

    <div id="preloader" v-show="Preloader"></div>

    <button @click="logout">Logout</button>
    <table>
      <th v-for="(field,name,index) in FieldsList" :key="index">
        {{field}}
      </th>
      <tr v-for="(items, name,index) in AirportData" :key="index">
        <td v-for="item in items " :key="item.id">
          {{item}}
        </td>
      </tr>
    </table>

    <div class="buttons">
      <div class="button" v-show="StatusTwoStepLeft" @click.stop="twoStepLeft"> &lt;&lt;</div>
      <div class="button" v-show="StatusOneStepLeft" @click.stop="oneStepLeft"> &lt;</div>

      <div class="button" v-show="StatusTwoStepLeft" @click.stop="selectPage($event,1)" :data-page="`${1}`"> {{1}}</div>
      <div class="button" v-show="StatusTwoStepLeft"> ...</div>

      <div class="button" :class="[{active:IsActivePage===p}]" v-for="p in PagesBuilder" :key="p" :data-page="`${p}`"
           @click.stop="selectPage($event,p)">{{p}}
      </div>

      <div class="button" v-show="StatusLastPage"> ...</div>
      <div class="button" v-show="StatusLastPage" @click.stop="selectPage($event,LastPage)" :data-page="`${LastPage}`">
        {{LastPage}}
      </div>

      <div class="button" v-show="StatusOneStepRight" @click.stop="oneStepRight"> &gt;</div>
      <div class="button" v-show="StatusTwoStepRight" @click.stop="twoStepRight"> &gt;&gt;</div>
    </div>

  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'FlightInformation',
  data () {
    return {}
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    selectPage: function (e, p) {
      let page = e.target.dataset.page * 1
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    twoStepRight: function () {
      let page = this.$store.getters.getSelectPage
      page += 2
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    twoStepLeft: function () {
      let page = this.$store.getters.getSelectPage
      page -= 2
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    oneStepRight: function () {
      let page = this.$store.getters.getSelectPage
      page += 1
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    oneStepLeft: function () {
      let page = this.$store.getters.getSelectPage
      page -= 1
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    }
  },
  computed: {
    AirportData () {
      return this.$store.getters.getAirportDataInfo
    },
    FieldsList () {
      return this.$store.getters.getFields
    },
    Preloader () {
      return this.$store.getters.getStatusPreloader
    },
    PagesBuilder () {
      const pages = []
      let total = this.$store.getters.getMaxPages
      let page = this.$store.getters.getSelectPage
      let firststep = page - 2 < 1 ? 1 : page - 2
      let elements = 5
      firststep = page === 3 ? 2 : firststep

      for (let p = firststep, i = 0; p <= total; p++, i++) {
        if (i < elements) {
          pages.push(p)
        }
      }
      return pages
    },
    StatusTwoStepRight () {
      let page = this.$store.getters.getSelectPage
      let max = this.$store.getters.getMaxPages
      let status = !(max - page <= 2)
      this.$store.dispatch('StatusTwoStepRight', status)
      return this.$store.getters.getStatusTwoStepRight
    },
    StatusTwoStepLeft () {
      let page = this.$store.getters.getSelectPage
      let status = !(page <= 2)
      this.$store.dispatch('StatusTwoStepLeft', status)
      return this.$store.getters.getStatusTwoStepLeft
    },
    StatusOneStepRight () {
      let page = this.$store.getters.getSelectPage
      let max = this.$store.getters.getMaxPages
      let status = !(max - page <= 1)
      this.$store.dispatch('StatusOneStepRight', status)
      return this.$store.getters.getStatusOneStepRight
    },
    StatusOneStepLeft () {
      let page = this.$store.getters.getSelectPage
      let status = !(page <= 1)
      this.$store.dispatch('StatusOneStepLeft', status)
      return this.$store.getters.getStatusOneStepLeft
    },
    StatusLastPage () {
      let page = this.$store.getters.getSelectPage
      let max = this.$store.getters.getMaxPages
      let status = !(max - page <= 2)
      this.$store.dispatch('StatusLastPage', status)
      return this.$store.getters.getStatusLastPage
    },
    LastPage () {
      return this.$store.getters.getMaxPages
    },
    IsActivePage () {
      return this.$store.getters.getActivePage
    }
  },
  beforeCreate () {
    this.$store.dispatch('AirportDataInfo')
  }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

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

  .buttons {
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
  }

  .active {
    background-color: red;
  }

</style>
