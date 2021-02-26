
export default function loginReducer(state = null, action) {

    // Casos en función del campo type del objeto action
    switch (action.type) {
        case 'login':
            return action.data
        case 'logout':
            return null
        case 'update':
            return {...state, ...action.data}
        default:
            return state
    }
}
