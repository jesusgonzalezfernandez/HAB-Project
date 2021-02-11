// export const login = () => ({ type: 'login' })
// export const expert = () => ({ type: 'expert' })
// export const admin = () => ({ type: 'admin' })
// export const student = () => ({ type: 'student' })
// export const logout = () => ({ type: 'logout' })


export default function loginReducer(state = null, action) {
    switch (action.type) {
        case 'login':
            return action.data
        // case 'expert':
        //     return { data: action.data, isExpert: action.role === 'expert' }
        // case 'admin':
        //     return { data: action.data, isAdmin: action.role === 'admin' }
        // case 'student':
        //     return { data: action.data, isStudent: action.role === 'student' }
        case 'logout':
            return null
        default:
            return state
    }
}
