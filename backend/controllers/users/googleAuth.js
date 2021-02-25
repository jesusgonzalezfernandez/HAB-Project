
// Dependencias
<<<<<<< HEAD
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
=======
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

>>>>>>> b1c95f6f7587fa7067fb014d6670b4319e6dfa3d

const googleAuth = async (req, res) => {
    console.log('*  Google Auth  *')
    try {

<<<<<<< HEAD
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
=======
        const token = req.body.token;
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_APP_CLIENT_ID,  
            });
            const payload = ticket.getPayload();
            const userID = payload['sub'];
            console.log('payload: ', payload)

        }
>>>>>>> b1c95f6f7587fa7067fb014d6670b4319e6dfa3d

        verify().catch(console.error);
    } catch (e) {

        res.status(401).send(e.message)
        return

    }
    }

        // Enviar al front
        // res.status(201).json(user)
        // console.log(req.body)

    // } catch (e) {

    //     res.status(401).send(e.message)
    //     return

    // }



module.exports = googleAuth