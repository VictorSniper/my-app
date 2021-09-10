
const mutations ={
    idAdd(state){
        state.id++
    },
    isCollapseHandle(state){
        state.isCollapse=!state.isCollapse
    },
    isTrueHandle(state){
        state.isTrue=true
    },
    isFalseHandle(state){
        state.isTrue=false
    }
}
export default mutations