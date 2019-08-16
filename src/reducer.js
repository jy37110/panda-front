const userStateReducer = (state = {}, action) => {
    switch(action.type){
        case "user login":
            return Object.assign({}, state, {login: true, token: action.token});
        case "user logout":
            return Object.assign({}, state, {login: false, token: null});
        case "initial user state":
            return Object.assign({}, state, {login: false, token: null});
        default:
            return state;
    }
};

const reducer = (state = {}, action) => {
    return {
        userState: userStateReducer(state.userState, action)
    }
};

export default reducer;