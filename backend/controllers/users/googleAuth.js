const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

// Queries
const getUserQuery = require ('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery')

const findUser = async (email) => {

    const query =

        `
           SELECT * FROM users WHERE email = '${email}' AND active = true 
        `

    const result = await performQuery(query)
    return result

}

 const addUser = async (email, name, surname, avatar, username) => {

    const query =

        `
    INSERT INTO users ( 

        creationDate, 
        updateDate, 
        email, 
        username,
        name,
        surname,
        active,
        avatar,
        password

    )

    VALUES ( 

        UTC_TIMESTAMP, 
        UTC_TIMESTAMP, 
        '${email}', 
        'googleUSer${username}', 
        '${name}', 
        '${surname}',
        1,
        '${avatar}',
        'passwordGoogleUser'


    )
`

    const result = await performQuery(query)
    return result

}


const updateTokenQuery = async (token, email) => {

    const query =

        `
            UPDATE users SET 

                updateDate = UTC_TIMESTAMP,
                token = '${token}' 
                
            WHERE email = '${email}' AND active = true 
        `

    const result = await performQuery(query)
    return result

}

const googleAuth = async (req, res) => {
    console.log('*  Google Auth  *')
    let query;

    try {
        const token = req.body.token;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });

        const payload = ticket.getPayload();
        let email = payload.email
        email = { email }
        query = getUserQuery (email)

        let user = ( await performQuery (query) )[0]

        if(!user) {
            user = await addUser(payload.email, payload.given_name, payload.family_name, payload.picture, payload.sub)
            user = ( await performQuery (query) )[0]
            return user
        }

        const tokenPayload = {

            userID: user.id,
            isAdmin: user.role === 'admin',
            isExpert: user.role === 'expert',
            email: user.email,
            username: user.username,
            name: user.name,
            role: user.role,
            password: user.password
        }

        const tokenDB = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '1d' });


        // Enviar a BD
        const result = await updateTokenQuery(tokenDB, email)

        // Error
        if (!result) {

            throw new Error('Database Error')

        }

        console.log(`Successfully Authenticated. Affected Rows: ${result.affectedRows} `);

        // Enviar al front
        res.json({
            token,
            userID: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            surname: user.surname,
            birthDate: user.birthDate,
            avatar: user.avatar,
            isAdmin: user.role === 'admin',
            isExpert: user.role === 'expert',
            isStudent: user.role === 'student',
            country: user.country
        })

    } catch (e) {

        res.status(401).send(e.message)
        return

    }

    console.log('Logged-in user')

}


module.exports = googleAuth