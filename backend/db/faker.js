const faker = require('faker')
const performQuery = require('./performQuery');
const moment = require('moment');
const bcrypt = require('bcrypt');

const languages = [
    'Javascript', 
    'PHP', 
    'MySQL', 
    'Vue', 
    'C++', 
    'C#', 
    'React', 
    'Java', 
    'Python',
    'Ruby', 
    'Spark', 
    'HTML', 
    'CSS'
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

const createLanguages = async () => {

    const createLanguagesQuery = async data => {

        const query = 

        `
            
            INSERT INTO languages (

                creationDate,
                updateDate,
                name

            )

            VALUES (
                UTC_TIMESTAMP, 
                UTC_TIMESTAMP,
                '${data.name}' 
            )

        `

        const result = await performQuery(query) 
        return result

    }

    for (language of languages) {

        console.log('CREATING LANGUAGES');

        const reqData = {name: language}

        try {
    
            const result = await createLanguagesQuery(reqData)
    
            if (!result) {
    
                throw new Error('Database Error')
    
            }
        
        } catch(e) {
    
            console.log(e.message);
    
        }
    }




}

const createFakeUsers = async u => {

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
    
    for (let i = 0; i < u; i++) {
        
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

const createFakeAnswers = async (u, q, a) => {

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

    for (let i = 0; i < u * a; i++) {

        console.log('CREATING FAKE ANSWERS');

        const reqData = {

            userID: faker.random.number({min:1, max: u}),
            questionID: faker.random.number({min:1, max: u * q}),
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

const createFakeUsers_Languages = async u => {

    const createFakeUsers_LanguagesQuery = async data => {

        const query = 

        `
            
            INSERT INTO users_languages (

                userID,
                languageID

            )

            SELECT id, '${data.languageID}' 
            FROM users WHERE id = '${data.userID}' 
            AND role = 'expert'; 

        `

        const result = await performQuery(query) 
        return result

    }

    for (let i = 1; i <= u; i++) {
        
        console.log('CREATING FAKE USERS-LANGUAGE RELATION');

        /* 
        
            Número de veces que se crearán lenguajes.
            Los usuarios recibirán entre 1 y 5 lenguajes
            en los que son expertos.

        */

        const max = Math.floor(Math.random() * 5)

        for (let j = 0; j < max; j++) {

            // Número random de lenguaje
            const randomNumber = Math.floor(Math.random() * languages.length) + 1;
    
            const reqData = {
    
                userID: i,
                languageID: randomNumber
    
            }

            try {

                const result = await createFakeUsers_LanguagesQuery(reqData)
    
                if (!result) {
    
                    throw new Error('Database Error')
    
                }
            
            } catch(e) {
    
                console.log(e.message);
    
            }
            
        }
    }

}

const createFakeQuestions = async (u, q) => {

    const createFakeQuestionsQuery = async data => {

        const query = 
        
            `
            
                INSERT INTO questions (
    
                    userID,
                    title,
                    body,
                    file,
                    tags,
                    creationDate,
                    updateDate
    
                )
    
                VALUES (
    
                    ${data.userID},
                    '${data.title}',
                    '${data.body}',
                    '${data.file}',
                    '${data.tags}',
                    UTC_TIMESTAMP,
                    UTC_TIMESTAMP
    
                )
            
            `
    
        const result = await performQuery(query) 
        return result
    
    }

    for (let i = 0; i < u * q; i++) {

        console.log('CREATING FAKE QUESTIONS');

        languagesRandomNumber = Math.floor(Math.random()*languages.length);

        const reqData = {

            userID: faker.random.number({min: 1, max: u}),
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

const createFakeQuestions_Languages = async (u, q) => {

    const createFakeQuestions_LanguagesQuery = async data => {

        const query = 

        `
            
            INSERT INTO questions_languages (

                questionID,
                languageID

            )

            VALUES (
                '${data.questionID}',
                '${data.languageID}'
            )

        `

        const result = await performQuery(query) 
        return result
    
    }

    for (let i = 1; i <= (u * q); i++) {
        
        console.log('CREATING FAKE QUESTIONS-LANGUAGE RELATION');

        /* 
        
            Número de veces que se crearán lenguajes.
            Algunas preguntas reciben 1, otros 2, otras 3

        */

        const iteration = Math.floor(Math.random() * 2) + 1

        for (let j = 0; j < iteration; j++) {

            // Número random de lenguaje
            const randomNumber = Math.floor(Math.random() * languages.length);
    
            const reqData = {
    
                questionID: i,
                languageID: randomNumber
    
            }

            try {

                const result = await createFakeQuestions_LanguagesQuery(reqData)
    
                if (!result) {
    
                    throw new Error('Database Error')
    
                }
            
            } catch(e) {
    
                console.log(e.message);
    
            }
            
        }
    }


}

const createFakeVotes = async (u, q, a, v) => {

    const createFakeVotesQuery = async data => {

        const query = 
    
        `
            
            INSERT INTO votes ( 
    
                creationDate,
                updateDate,
                answerID,
                userID,
                value
    
            )
    
            VALUES ( 
    
                UTC_TIMESTAMP, 
                UTC_TIMESTAMP, 
                '${data.answerID}', 
                '${data.userID}',
                ${data.value}
            
            )
    
        `

        const result = await performQuery(query) 
        return result
    
    }

    for (let i = 0; i < u * a; i++) {

        console.log('CREATING FAKE VOTES');

        const reqData = {

            answerID: faker.random.number({min:1, max: u * q * v}),
            userID: faker.random.number({min:1, max: u}),
            value: faker.random.boolean()

        }

        try {

            const result = await createFakeVotesQuery(reqData)

            if (!result) {

                throw new Error('Database Error')

            }
        
        } catch(e) {

            console.log(e.message);

        }

    }

}

const fakeData = async (u, q, a, v) => {

    try {

        // await createLanguages()
        // await createFakeUsers(u)
        await createFakeUsers_Languages(u)
        // await createFakeQuestions(u, q)
        // await createFakeQuestions_Languages(u, q)
        // await createFakeAnswers(u, q, a)
        // await createFakeVotes(u, q, a, v)
        
    } catch (e) {
        
        console.log(`Error: ${e}`);

    }

}

/*

    fakeData toma como primer argumento
    el número de usuarios, como segundo
    el ratio de preguntas, como tercero 
    el ratio de respuestas, como cuarto
    el ratio de votos.

    Mejor mantenerlo en menos de 50 de una ;)

*/

(async () => {
    await fakeData(100, 2, 3, 2)
  })()