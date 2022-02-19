let initialState={
    login: false,
    token: null,
    username: null,
}
if(localStorage.getItem('token')){
     initialState = {
        login: true,
        token: localStorage.getItem('token'),
        username:localStorage.getItem('username'),
    }
}else{
     initialState = {
        login: false,
        token: null,
        username: null,
    }
}

const changeLogState = (state = initialState, action) => {
    switch (action.type) {
        case 'logedin':
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('username',action.payload.username)
            return {
                ...state,
                login: true,
                token: action.payload.token,
                username: action.payload.username,

            }

        case 'logout':
            var theme=localStorage.getItem('theme')
            localStorage.clear();
            localStorage.setItem('theme',theme)
            return {
                ...state,
                login: false,
                token: null,
                username: null,
            }
        default:
            return state


    }}

export default changeLogState