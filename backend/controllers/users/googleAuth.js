const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const performQuery = require('../../db/performQuery')
const session = require('express-session')


const googleUser = async (given_name, email, picture) => {

    const query =

        `
            UPDATE users SET 

                avatar = '${picture}' ,
                name = '${given_name}' 
                
            WHERE email = '${email}' AND active = true 
        `

    const result = await performQuery(query)
    return result

}

const googleAuth = async (req, res) => {
    console.log('*  Google Auth  *')
    try {

        const token = req.body.token;
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_APP_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userId = payload.sub
            console.log('payload: ', payload)
            
            const user = await googleUser(payload.given_name, payload.email, payload.picture)

            req.session.userId = user.id

            console.log(req.session)

            console.log(user)
        }

        verify().catch(console.error);
    } catch (e) {

        res.status(401).send(e.message)
        return

    }
}


module.exports = googleAuth