<template>
  <div class="buttons">
    <div class="button" v-show="TwoStepLeft" @click.stop="twoStepLeft"> &lt;&lt;</div>
    <div class="button" v-show="OneStepLeft" @click.stop="oneStepLeft"> &lt;</div>

    <div class="button" v-show="TwoStepLeft" @click.stop="selectPage($event,1)" :data-page="`${1}`"> {{1}}</div>
    <div class="button" v-show="TwoStepLeft"> ...</div>

    <div class="button" :class="[{active:IsActivePage===p}]" v-for="p in PagesBuilder" :key="p" :data-page="`${p}`"
         @click.stop="selectPage($event,p)">{{p}}
    </div>

    <div class="button" v-show="TwoStepRight"> ...</div>
    <div class="button" v-show="TwoStepRight" @click.stop="selectPage($event,LastPage)" :data-page="`${this.LastPage}`">
      {{LastPage}}
    </div>

    <div class="button" v-show="OneStepRight" @click.stop="oneStepRight"> &gt;</div>
    <div class="button" v-show="TwoStepRight" @click.stop="twoStepRight"> &gt;&gt;</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'pagination',
  methods: {
    selectPage: function (e, p) {
      let page = e.target.dataset.page * 1
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    twoStepRight: function () {
      let page = this.SelectPage
      page += 2
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    twoStepLeft: function () {
      let page = this.SelectPage
      page -= 2
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    oneStepRight: function () {
      let page = this.SelectPage
      page += 1
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    },
    oneStepLeft: function () {
      let page = this.SelectPage
      page -= 1
      this.$store.dispatch('ActivePage', page)
      this.$store.dispatch('SelectPage', page)
      return this.$store.dispatch('AirportDataInfo')
    }
  },
  computed: {
    ...mapGetters([
      'MaxPages',
      'SelectPage',
      'ActivePage',
      'StatusTwoStepRight',
      'StatusTwoStepLeft',
      'StatusOneStepRight',
      'StatusOneStepLeft'
    ]),
    ...mapActions([
      'AirportDataInfo',
      'ActivePage',
      'SelectPage',
      'StatusTwoStepRight',
      'StatusTwoStepLeft',
      'StatusOneStepRight',
      'StatusOneStepLeft'
    ]),
    PagesBuilder () {
      const pages = []
      const max = this.MaxPages
      let page = this.SelectPage
      let firststep = page - 2 < 1 ? 1 : page - 2
      const elements = 5
      firststep = page === 3 ? 2 : firststep
      for (let p = firststep, i = 0; p <= max; p++, i++) {
        if (i < elements) {
          pages.push(p)
        }
      }
      return pages
    },
    TwoStepRight () {
      let status = !(this.MaxPages - this.SelectPage <= 2)
      this.$store.dispatch('StatusTwoStepRight', status)
      return this.StatusTwoStepRight
    },
    TwoStepLeft () {
      let status = !(this.SelectPage <= 2)
      this.$store.dispatch('StatusTwoStepLeft', status)
      return this.StatusTwoStepLeft
    },
    OneStepRight () {
      let status = !(this.MaxPages - this.SelectPage <= 1)
      this.$store.dispatch('StatusOneStepRight', status)
      return this.StatusOneStepRight
    },
    OneStepLeft () {
      let status = !(this.SelectPage <= 1)
      this.$store.dispatch('StatusOneStepLeft', status)
      return this.StatusOneStepLeft
    },
    LastPage () {
      return this.MaxPages
    },
    IsActivePage () {
      return this.ActivePage
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
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
