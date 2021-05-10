const initialState = {
    type: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_TYPE':
            return {
                ...state,
                type: action.payload
            }
        default:
            return state
    }
}

export default reducer