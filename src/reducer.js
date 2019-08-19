const userStateReducer = (state = {}, action) => {
    switch(action.type){
        case "user login":
            return Object.assign({}, state, {login: true, token: action.token, userId: action.userId, userName: action.userName});
        case "user logout":
            return Object.assign({}, state, {login: false, token: null, userId: null, userName: null});
        case "initial state":
            return Object.assign({}, state, {login: false, token: null, userId: null, userName: null});
        default:
            return state;
    }
};
const invoiceReducer = (state = {}, action) => {
    switch(action.type){
        case "initial state":
            return Object.assign({}, state, {invoices:[]});
        case "sync invoice":
            return Object.assign({}, state, {invoices: action.invoices});
        case "user logout":
            return Object.assign({}, state, {invoices: []});
        default:
            return state;
    }
};

const reducer = (state = {}, action) => {
    return {
        userState: userStateReducer(state.userState, action),
        invoiceState: invoiceReducer(state.invoiceState, action),
    }
};

export default reducer;