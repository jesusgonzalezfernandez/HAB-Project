
// Dependencias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


const googleAuth = async (req, res) => {

    try {

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