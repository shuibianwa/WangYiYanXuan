import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
import api from '@/assets/config/api.js'
export default new Vuex.Store({
  state: {
    cartTotal:
    {
      goodsCount: 0,
      goodsAmount: 0,
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0
    },
    cartList:[],
  },
  mutations: {
    setCarList(state,cartList){
      state.cartList = cartList
    },
    setCartTotal(state,cartTotal){
      state.cartTotal = cartTotal
    }
  },
  actions: {
   async AjaxCart(content){
      let cartRes = await axios.get(api.CartList)
       console.log(cartRes.data)
      content.commit('setCarList',cartRes.data.data.cartList)
      content.commit('setCartTotal',cartRes.data.data.cartTotal)
    }
  },
  modules: {
  }
})
