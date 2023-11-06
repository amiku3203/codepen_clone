const searchReducer=(state="",action)=>{
    switch(action.type){
        case "SET_SEARCH_TERM":
           return {
               ...state,
               searchTerm:action.searchTerm
           }
           case "SET_SEARCH_TERM_NULL":
           return {
               ...state,
               searchTerm: ""
           }
           default :
           return state
    }
}

export default  searchReducer;