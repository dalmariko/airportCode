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
    ...mapActions({
      info: 'AirportDataInfo',
      ap: 'ActivePage',
      sp: 'SelectPage',
      tsr: 'StatusTwoStepRight',
      tsl: 'StatusTwoStepLeft',
      osr: 'StatusOneStepRight',
      osl: 'StatusOneStepLeft'

    }),
    selectPage: function (e, p) {
      let page = e.target.dataset.page * 1
      this.ap(page)
      this.sp(page)
      return this.info(page)
    },
    twoStepRight: function () {
      let page = this.SelectPage
      page += 2
      this.ap(page)
      this.sp(page)
      return this.info(page)
    },
    twoStepLeft: function () {
      let page = this.SelectPage
      page -= 2
      this.ap(page)
      this.sp(page)
      return this.info(page)
    },
    oneStepRight: function () {
      let page = this.SelectPage
      page += 1
      this.ap(page)
      this.sp(page)
      return this.info(page)
    },
    oneStepLeft: function () {
      let page = this.SelectPage
      page -= 1
      this.ap(page)
      this.sp(page)
      return this.info(page)
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
    PagesBuilder () {
      const pages = []
      const max = this.MaxPages
      let page = this.SelectPage
      const elements = 5
      let firststep = page - 2 < 1 ? 1 : page - 2
      firststep = page === 3 ? 2 : firststep
      let laststep = firststep + elements
      laststep = laststep >= max ? max : laststep
      for (let p = firststep; p <= laststep; p++) {
        pages.push(p)
      }
      return pages
    },
    TwoStepRight () {
      let status = !(this.MaxPages - this.SelectPage <= 2)
      this.tsr(status)
      return this.StatusTwoStepRight
    },
    TwoStepLeft () {
      let status = !(this.SelectPage <= 2)
      this.tsl(status)
      return this.StatusTwoStepLeft
    },
    OneStepRight () {
      let status = !(this.MaxPages - this.SelectPage <= 1)
      this.osr(status)
      return this.StatusOneStepRight
    },
    OneStepLeft () {
      let status = !(this.SelectPage <= 1)
      this.osl(status)
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
