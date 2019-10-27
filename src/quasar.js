import Vue from 'vue'

import './styles/quasar.styl'
import iconSet from 'quasar/icon-set/ionicons-v4.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSpace,
  Ripple
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSpace
  },
  directives: {
    Ripple
  },
  plugins: {
  },
  iconSet: iconSet
 })