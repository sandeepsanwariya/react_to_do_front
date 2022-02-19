const dark = {
    backgroundColor: "#333333",
    color: "#ffffff",
    primary: "#77ccdd"
  }
  const light= {
    backgroundColor: "#e0e0e0",
    color: "#000000",
    primary: "#55aacc"
  }


let themes={
    backgroundColor: "#e0e0e0",
    color: "#000000",
    primary: "#55aacc"
}
if(localStorage.getItem('theme')){
    if(localStorage.getItem('theme')==='dark')
    {
     themes= {
        backgroundColor: "#333333",
        color: "#ffffff",

        primary: "#77ccdd"
      }
    }else{
        themes={
            backgroundColor: "#e0e0e0",
    
            primary: "#55aacc",
            color: "#000000",
        }
    }

}
const changeThemeState = (state=themes, action) => {
    switch (action.type) {
        case 'light':
            localStorage.setItem('theme','light')
            return {
                ...state,
            backgroundColor: "#e0e0e0",
            color: "#000000",
    
            primary: "#55aacc"
            }
           

        case 'dark':
            localStorage.setItem('theme','dark')
            return {
                ...state,
                backgroundColor: "#333333",
                color: "#ffffff",
        
                primary: "#77ccdd"
            }
    default:
         return state
    }}

export default changeThemeState