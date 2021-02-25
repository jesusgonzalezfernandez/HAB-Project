// app.post("/api/v1/auth/google", async (req, res) => {
//     const { token } = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID
//     });
//     const { name, email, picture } = ticket.getPayload();
//     const user = await db.user.upsert({
//         where: { email: email },
//         update: { name, picture },
//         create: { name, email, picture }
//     })
//     res.status(201)
//     res.json(user)
// })

// Dependencias
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
require('dotenv').config()

const {JWT} = require('google-auth-library');
const keys = require('./jwt.keys.json');




// Queries
// const getUserQuery = require('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery');





const googleUser = async (name, email, picture) => {

    const query =

        `
            UPDATE users SET 

                avatar = '${picture}' ,
                name = '${name}' 
                
            WHERE email = '${email}' AND active = true 
        `

    const result = await performQuery(query)
    return result

}

const googleAuth = async (req, res) => {
    console.log('*  Google Auth  *')
    try {

        const { token } = req.body

        const client = new JWT({
            email: keys.client_email,
            key: keys.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
          });

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });

        console.log('tiket    ' + ticket)

        const { name, email, picture } = ticket.getPayload();

        const user = await googleUser(name, email, picture)

        // Enviar al front
        res.status(201).json(user)

    } catch (e) {

        res.status(401).send(e.message)
        return

    }

}

module.exports = googleAuth