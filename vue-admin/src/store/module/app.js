const state={
    slidebar:{
      collapse:false
    },
    tabLoading:false
  };
  const mutations={
    TOGGLE_SLIDEBAR:(state,res)=>{
      if(state.slidebar.collapse){
        state.slidebar.collapse=false
      }else{
        state.slidebar.collapse=true
      }
    },
    // 请求加载动画效果
    TABLOADING:(state,res)=>{
      state.tabLoading = res
    }


  };
  const actions={
    ToggleSlideBar({commit}){
      commit('TOGGLE_SLIDEBAR')
    }
  };
  export default {
    state,
    mutations,
    actions
  }