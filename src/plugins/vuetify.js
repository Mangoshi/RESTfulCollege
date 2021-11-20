import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.deepPurple.darken4,
            secondary: colors.deepPurple.darken1,
            accent: colors.deepPurple.base,
          },
          dark: {
            primary: colors.yellow.darken1,
            secondary: colors.yellow.darken3,
            accent: colors.deepOrange.base,
          }
        },
      },
    icons: {
        iconfont: 'mdiSvg', // Material Design icons
    },
})