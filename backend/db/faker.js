const faker = require('faker')
const fetch = require('node-fetch');
const performQuery = require('./performQuery');
const moment = require('moment');
const bcrypt = require('bcrypt');



const createFakeUsers = async n => {

    const createFakeUsersQuery = async data => {

        const query = 
    
        `
            INSERT INTO users ( 
    
                creationDate, 
                updateDate, 
                email, 
                password, 
                username,
                name,
                surname,
                birthDate,
                country,
                role,
                active
    
            )
    
            VALUES ( 
    
                UTC_TIMESTAMP, 
                UTC_TIMESTAMP, 
                '${data.email}', 
                '${data.password}',
                '${data.username}', 
                '${data.name}', 
                '${data.surname}',
                '${data.birthDate}', 
                '${data.country}',
                '${data.role}', 
                1 
    
            )
        `
        
        const result = await performQuery(query) 
        return result
    
    }
    
    for (let i = 0; i < n; i++) {
        
        console.log('CREATING FAKE USERS');

        const randomNumber = Math.random();

        const reqData = {

            email: faker.internet.email(),
            password: '123456',
            username: faker.internet.userName(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            birthDate: faker.date.between('1970-01-01', '2007-01-05'),
            country: faker.address.country(),
            role: randomNumber < 0.9 ? 'student' : 'expert',

        }

        // Encriptar password y sustituir en reqData
        reqData.password = await bcrypt.hash(reqData.password, 10)

        // Formatear y almacenar fecha de nacimiento

            // Pasar la fecha del formato MM-DD-YYYY a timestamp
            const timestamp = reqData.birthDate.getTime() / 1000

            // Transformar de nuevo al formato de BD
            reqData.birthDate = moment.unix(timestamp).format('YYYY-MM-DD')

        try {

            const result = await createFakeUsersQuery(reqData)

            if (!result) {

                throw new Error('Database Error')

            }
        
        } catch(e) {

            console.log(e.message);

        }

    }
}

const createFakePosts = async (n, m) => {

    const createFakeQuestionsQuery = async data => {

        const query = 
        
            `
            
                INSERT INTO questions (
    
                    userID,
                    title,
                    body,
                    file,
                    languages,
                    tags,
                    creationDate,
                    updateDate
    
                )
    
                VALUES (
    
                    ${data.userID},
                    '${data.title}',
                    '${data.body}',
                    '${data.file}',
                    '${data.languages}',
                    '${data.tags}',
                    UTC_TIMESTAMP,
                    UTC_TIMESTAMP
    
                )
            
            `
    
        const result = await performQuery(query) 
        return result
    
    }

    const languages = [

        'Javascript', 
        'Python', 
        'React', 
        'Vue', 
        'CSS', 
        'HTML',
        'MySQL'
    
    ]

    const tags = [

        'http', 
        'jquery', 
        'networking', 
        'arrays', 
        'ajax', 
        'json',
        'android',
        'sql-server',
        'excel',
        'regex',
        'linux',
        'windows',
        'database',
        'bash',
        'oracle',
        'api'
    
    ]

    for (let i = 0; i < n * m; i++) {

        console.log('CREATING FAKE QUESTIONS');

        languagesRandomNumber = Math.floor(Math.random()*languages.length);

        const reqData = {

            userID: faker.random.number({min: 1, max: n}),
            title: faker.lorem.sentence(10, 10),
            body: faker.lorem.paragraphs(3),
            languages: languages[languagesRandomNumber],
            tags: tags
                .sort( () => Math.random() - Math.random() )
                .slice(0, Math.floor(Math.random() * 5 + 2))
        }

        try {

            const result = await createFakeQuestionsQuery(reqData)

            if (!result) {

                throw new Error('Database Error')

            }
        
        } catch(e) {

            console.log(e.message);

        }

    }

}

const createFakeAnswers = async (n, m, o) => {

    const createFakeAnswersQuery = async data => {

        const query = 
    
        `
            
            INSERT INTO answers ( 
    
                creationDate,
                updateDate,
                userID,
                questionID,
                body,
                file 
    
            )
    
            VALUES ( 
    
                UTC_TIMESTAMP, 
                UTC_TIMESTAMP, 
                '${data.userID}', 
                '${data.questionID}',
                '${data.body}',
                '${data.file}'
            
            )
    
        `
    
        const result = await performQuery(query) 
        return result
    
    }

    for (let i = 0; i < n * o; i++) {

        console.log('CREATING FAKE ANSWERS');

        const reqData = {

            userID: faker.random.number({min:1, max: n}),
            questionID: faker.random.number({min:1, max: n * m}),
            body: faker.lorem.paragraphs(1),

        }

        try {

            const result = await createFakeAnswersQuery(reqData)

            if (!result) {

                throw new Error('Database Error')

            }
        
        } catch(e) {

            console.log(e.message);

        }

    }

}

const createFakeContent = async (n, m, o) => {

    try {

        await createFakeUsers(n)
        await createFakePosts(n, m)
        await createFakeAnswers(n, m, o)
        
    } catch (e) {
        
        console.log(`Error: ${e}`);

    }

}

/*

    createFakeContent toma como primer argumento
    el número de usuarios, como segundo
    el ratio de preguntas, y como tercero 
    el ratio de respuestas

    Mejor mantenerlo en menos de 50 de una ;)

*/

createFakeContent(50, 2, 5)