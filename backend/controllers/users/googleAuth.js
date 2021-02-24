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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Queries
// const getUserQuery = require('../../queries/getUserQuery')
const performQuery = require('../../db/performQuery');





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

    try {

        const { token } = req.auth
        const reqData = req.body

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });

        const { name, email, avatar } = ticket.getPayload();

        const user = await db.user.upsert({
            where: { email: email },
            update: { name, picture },
            create: { name, email, picture }
        })

        // Enviar al front
        res.status(201).json(user)

    } catch (e) {

        res.status(401).send(e.message)
        return

    }

}

module.exports = googleAuth