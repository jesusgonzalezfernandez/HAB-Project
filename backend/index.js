// Configuración
require('dotenv').config()

// Dependencias
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const fileUpload = require("express-fileupload");

// Middlewares
const isAuthenticated = require ('./middlewares/isAuthenticated')
const isSameUser = require ('./middlewares/isSameUser')
const isExpert = require ('./middlewares/isExpert')
const isAuthor = require ('./middlewares/isAuthor')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload());
app.use('/images', express.static(__dirname +'/images'));

// User Controllers
const createUser = require('./controllers/users/createUser')
const validateUser = require('./controllers/users/validateUser')
const userLogin = require('./controllers/users/userLogin')
const userLogout = require('./controllers/users/userLogout')
const recoverAccount = require('./controllers/users/recoverAccount')
const resetAccount = require('./controllers/users/resetAccount')
const updateUser = require('./controllers/users/updateUser')
const updatePassword = require('./controllers/users/updatePassword')
const deleteUser = require('./controllers/users/deleteUser')
const getUsersList = require('./controllers/users/getUsersList')
const getUserData = require('./controllers/users/getUserData')
const getUserProfileData = require('./controllers/users/getUserProfileData')

// Content Controllers
const createQuestion = require('./controllers/content/createQuestion')
const createAnswer = require ('./controllers/content/createAnswer')
const getQuestionsList = require ('./controllers/content/getQuestionsList')
const uploadFiles = require('./controllers/content/uploadFiles')
const castVote = require ('./controllers/content/castVote')
const getQuestionDetails = require ('./controllers/content/getQuestionDetails')
const updateQuestion = require ('./controllers/content/updateQuestion')
const updateAnswer = require ('./controllers/content/updateAnswer')
const updateVote = require ('./controllers/content/updateVote')
const deleteQuestion = require ('./controllers/content/deleteQuestion')
const deleteAnswer = require ('./controllers/content/deleteAnswer')
const getAnswerDetails = require ('./controllers/content/getAnswerDetails')
const getUserAnswers = require('./controllers/content/getUserAnswers')



// 1. User Endpoints

    // 1.1 Registrar Usuario
    app.post('/users', createUser)

    // 1.2 Validar Usuario
    app.get('/users/validate/:code', validateUser)

    // 1.3 Login
    app.post('/users/login', userLogin)

    // 1.4 Logout
    app.post('/users/:userID/logout', isAuthenticated, isSameUser, userLogout)

    // 1.5 Recuperar Cuenta - Primer Paso. Enviar código de recuperación
    app.post('/users/recover-account', recoverAccount)
    
    // 1.6 Resetear Contraseña - Segundo paso. Insertar código de recuperación, activar y añadir nueva contraseña
    app.put('/users/reset-account', resetAccount)

    // 1.7 Editar Perfil
    app.put('/users/:userID', isAuthenticated, isSameUser, updateUser)

    // 1.8 Actualizar Contraseña
    app.put('/users/:userID/password', isAuthenticated, isSameUser, updatePassword)

    // 1.9 Eliminar Perfil
    app.delete("/users/:userID", isAuthenticated, isSameUser, deleteUser)

    // 1.10 Obtener Lista de Usuarios
    app.get('/users', isAuthenticated, getUsersList)
    
    // 1.12 Obtener Información detallada de un Usuario
    app.get('/users/profile/:userID', isAuthenticated, isSameUser, getUserProfileData)

    // 1.13 Obtener Información de un Usuario Desde Otro Perfil
    app.get('/users/:userID', isAuthenticated, getUserData)


// 2. Content Endpoints

    // 2.1 Publicar una Pregunta
    app.post('/questions', isAuthenticated, createQuestion)
    
    // 2.2 Publicar una Respuesta
    app.post('/questions/:questionID', isAuthenticated, isExpert, createAnswer)

    // 2.3 Emitir Voto
    app.post('/questions/:answerID/vote', isAuthenticated, castVote)
    
    // 2.4 Postear una imagen
    app.post('/images/', uploadFiles)
    
    // 2.5 Editar una Pregunta
    app.put('/questions/:questionID', isAuthenticated, isAuthor, updateQuestion)

    // 2.6 Editar una Respuesta
    app.put('/questions/:questionID/:answerID', isAuthenticated, isAuthor, updateAnswer)

    // 2.7 Editar un Voto
    app.put('/questions/:questionID/:answerID/:voteID', isAuthenticated, isAuthor, updateVote)
        
    // 2.8 Obtener Lista de Preguntas Filtradas
    app.get('/questions', getQuestionsList)
    
    // 2.9 Obtener una Pregunta
    app.get('/questions/:questionID', isAuthenticated, getQuestionDetails)
    
    // 2.10 Eliminar una Pregunta
    app.delete('/questions/:questionID', isAuthenticated, isAuthor, deleteQuestion)

    // 2.11 Eliminar una Respuesta
    app.delete('/questions/:questionID/:answerID', isAuthenticated, isAuthor, deleteAnswer)

    // 2.12 Obtener una Respuesta
    app.get ('/answers/:questionID', getAnswerDetails)

    // 2.13 Obtener Respuestas de un Usuario
    app.get ('/answers/:userID', isAuthenticated, isAuthor, getUserAnswers)


// Servidor

// Servidor de .env
const envPort = process.env.PORT
// Servidor por defecto
const defaultPort = 3002

const currentPort = envPort || defaultPort    

app.listen(currentPort)
console.log(`Running on port ${currentPort}`)