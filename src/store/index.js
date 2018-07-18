import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";

import * as api from "../api";
import { getCurrentMenu, getSessionKey } from '../common/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常

  getters: {
    loading: state => state.loading,


  },
  state: {
    loading: false,
  },
  mutations: {

  }, actions: {

  },
})

export default store
