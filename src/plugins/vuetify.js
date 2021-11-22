import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
      themes: {
        light: {
          primary: '#000',
          secondary: '#fff',
          accent: colors.pink.lighten2,
          info: '#00FFFF',
          warning: '#FFD600',
          error: '#FF0000',
        },
        dark: {
          primary: '#fff',
          secondary: '#000',
          accent: colors.orange.base,
          info: '#00FFFF',
          warning: '#FFD600',
          error: '#FF0000',
        }
      },
    }
})