import { createStore } from "vuex";
import mutations from './mutations'
const store = createStore({
  state: {
    id: 0,
    isCollapse:false,
    isTrue:false,
    userInfo:{
      name:"北辰"
    }
  },
  mutations
});
export default store;
