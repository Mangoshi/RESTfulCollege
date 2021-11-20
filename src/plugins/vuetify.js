import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: colors.pink.darken1,
            secondary: colors.pink.darken1,
            accent: colors.deepPurple.base,
          },
          dark: {
            primary: colors.pink.lighten1,
            secondary: colors.pink.lighten2,
            accent: colors.deepPurple.base,
          }
        },
      },
    icons: {
        iconfont: 'mdiSvg', // Material Design icons
    },
})