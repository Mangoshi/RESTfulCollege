import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
	theme: {
		themes: {
			light: {
				black: '#000',
				primary: '#000',
				secondary: '#fff',
				accent: colors.pink.lighten2,
				viewBG: '#00FFFF',
				editBG: '#FFD600',
				deleteBG: '#FF0000',
				viewFG: '#000',
				editFG: '#000',
				deleteFG: '#000',
			},
			dark: {
				black: '#000',
				primary: '#fff',
				secondary: '#000',
				accent: colors.orange.base,
				viewBG: '#000',
				editBG: '#000',
				deleteBG: '#000',
				viewFG: '#00FFFF',
				editFG: '#FFD600',
				deleteFG: '#FF0000',
			}
		},
	}
})