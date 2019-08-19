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
        case "delete invoice":
            let stateForDelete = Object.assign({}, state);
            stateForDelete.invoices = stateForDelete.invoices.filter(item => {
                return item.invoiceId !== action.invoiceId;
            });
            return stateForDelete;
        case "sort by name":
            let stateForSortName = Object.assign({}, state);
            stateForSortName.invoices = stateForSortName.invoices.sort((a,b) => {
                if(action.order === 'dec'){
                    return a.name > b.name ? 1 : ((b.name > a.name) ? -1 : 0);
                } else {
                    return a.name < b.name ? 1 : ((b.name < a.name) ? -1 : 0);
                }
            });
            return  stateForSortName;
        case "sort by category":
            let stateForSortCategory = Object.assign({}, state);
            stateForSortCategory.invoices = stateForSortCategory.invoices.sort((a,b) => {
                if(action.order === 'dec'){
                    return a.category > b.category ? 1 : ((b.category > a.category) ? -1 : 0);
                } else {
                    return a.category < b.category ? 1 : ((b.category < a.category) ? -1 : 0);
                }
            });
            return stateForSortCategory;
        case "sort by date":
            let stateForSortDate = Object.assign({}, state);
            stateForSortDate.invoices = stateForSortDate.invoices.sort((a,b) => {
                let aDate = new Date(a.happenedAt);
                let bDate = new Date(b.happenedAt);
                if(action.order === 'dec'){
                    return aDate > bDate ? 1 : ((bDate > aDate) ? -1 : 0);
                } else {
                    return aDate < bDate ? 1 : ((bDate < aDate) ? -1 : 0);
                }
            });
            return stateForSortDate;
        case "sort by total amount":
            let stateForSortTotalAmount = Object.assign({}, state);
            stateForSortTotalAmount.invoices = stateForSortTotalAmount.invoices.sort((a,b) => {
                if(action.order === 'dec'){
                    return a.totalAmount > b.totalAmount ? 1 : ((b.totalAmount > a.totalAmount) ? -1 : 0);
                } else {
                    return a.totalAmount < b.totalAmount ? 1 : ((b.totalAmount < a.totalAmount) ? -1 : 0);
                }
            });
            return stateForSortTotalAmount;
        case "sort by type":
            let stateForSortType = Object.assign({}, state);
            stateForSortType.invoices = stateForSortType.invoices.sort((a,b) => {
                if(action.order === 'dec'){
                    return a.duration > b.duration ? 1 : ((b.duration > a.duration) ? -1 : 0);
                } else {
                    return a.duration < b.duration ? 1 : ((b.duration < a.duration) ? -1 : 0);
                }
            });
            return stateForSortType;
        case "sort by daily amount":
            let stateForSortDailyAmount = Object.assign({}, state);
            stateForSortDailyAmount.invoices = stateForSortDailyAmount.invoices.sort((a,b) => {
                if(action.order === 'dec'){
                    return a.amountByDay > b.amountByDay ? 1 : ((b.amountByDay > a.amountByDay) ? -1 : 0);
                } else {
                    return a.amountByDay < b.amountByDay ? 1 : ((b.amountByDay < a.amountByDay) ? -1 : 0);
                }
            });
            return stateForSortDailyAmount;
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