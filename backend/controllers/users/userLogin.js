// Dependencias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery');





const updateTokenQuery = async (token, email) => {

    const query = 
    
        `
            UPDATE users SET 

                updateDate = UTC_TIMESTAMP,
                token = '${token}' 
                
            WHERE email = '${email}' AND active = true 
        `

    await performQuery(query)

}

const userLogin = async (req, res) => {

    let query;

    const reqData = req.body

    try {
        
        // Comprobar si el usuario existe / Obtener sus datos

            console.log('Checking if user exists');

                // Crear objeto email
                let email = reqData.email
                email = { email }

                // Obtener query (enviar objeto email)
                query = getUserQuery (email)

                // Procesar query
                const user = ( await performQuery (query) ) [0] 
                
                // Error
                if(!user) {

                    console.log('Incorrect User');
                    throw new Error('Incorrect user or password')
                
                }
            
        // Comprobar la contraseña

            console.log('Checking password');
            
            // Comparar 
            const validPassword = await bcrypt.compare(reqData.password, user.password);
                
            // Error
            if (!validPassword) {

                console.log('Incorrect Password');
                throw new Error('Incorrect user or password')
            
            }

        // Comprobar que el usuario ha sido activado

        console.log('Checking activation');

            if(!user.active) {
    
                throw new Error('User not yet activated')
    
            }

        // Procesar los datos

            // Definir el contenido del token
            const tokenPayload = {

                userID: user.id,
                isAdmin: user.role === 'admin',
                email: user.email,
                username: user.username,
                name: user.name,
                role: user.role,
                isExpert: user.role === 'expert',
                password: user.password,

            }

            // Encriptar token
            const token = jwt.sign(tokenPayload, process.env.SECRET, {expiresIn: '1d'});

            // Enviar a BD
            await updateTokenQuery(token, reqData.email)

            // Enviar al front
            res.json({
                token,
                userID: user.id,
                username: user.username,
                role: user.role
            })

    } catch (e) {

        res.status(401).send(e.message)
        return
        
    }

    console.log('Logged-in user')

}

module.exports = userLogin