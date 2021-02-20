// export const login = () => ({ type: 'login' })
// export const expert = () => ({ type: 'expert' })
// export const admin = () => ({ type: 'admin' })
// export const student = () => ({ type: 'student' })
// export const logout = () => ({ type: 'logout' })

/*

    El reducer recibe la acción, y en función del 
    valor del campo type, devuelve un estado u otro.

    Ese nuevo estado sustituye al 'state' 
    o estado inicial (siempre se crea un estado 
    nuevo, no se modifica el anterior)

*/

export default function loginReducer(state = null, action) {

    // Casos en función del campo type del objeto action
    switch (action.type) {
        
        case 'login':
            return action.data
        case 'logout':
            return null
        default:
            return state
    }
}
