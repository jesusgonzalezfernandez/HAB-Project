// Configuración
require('dotenv').config()

// Dependencias
const bcrypt = require('bcrypt')

// Acceso a BD
const getConnection = require ('./getConnection');

async function main() {

    let connection;

    try {

        connection = await getConnection();

        console.log('Deleting tables')

        await connection.query("SET FOREIGN_KEY_CHECKS = 0");
        await connection.query("DROP TABLE IF EXISTS users CASCADE");
        await connection.query("DROP TABLE IF EXISTS offUsers CASCADE");
        await connection.query("DROP TABLE IF EXISTS questions CASCADE");
        await connection.query("DROP TABLE IF EXISTS answers CASCADE");
        await connection.query("DROP TABLE IF EXISTS languages CASCADE");
        await connection.query("DROP TABLE IF EXISTS votes CASCADE");
        await connection.query("SET FOREIGN_KEY_CHECKS = 1");
        // Pablo. Necesitamos una tabla de aplicaciones
        // Pablo. Hay que completar y enlazar la tabla lenguajes a users y questions
    
        console.log('Creating new tables')

        // Users
        await connection.query(
                
            `
                CREATE TABLE if not exists users (
                    
                    id 
                        int unsigned auto_increment primary key,
                    email 
                        varchar(500) not null unique,
                    username 
                        varchar(500) not null unique,
                    password 
                        varchar(500) not null,
                    name 
                        varchar(50) default 'undefined',
                    surname 
                        varchar(50) default 'undefined',
                    role 
                        enum ('student', 'expert', 'admin') default 'student',
                    birthDate 
                        date not null,
                    country 
                        varchar(50) not null,
                    avatar 
                        varchar(500) default 'undefined',
                    languages 
                        set ('html', 'css', 'javascript', 'mysql', 'python', 'react', 'vue' ),
                    lastConnection 
                        timestamp,
                    status 
                        tinyint default 0,
                    registrationDate 
                        timestamp,
                    active 
                        boolean default false,
                    validationCode 
                        VARCHAR(100),
                    token
                        VARCHAR(500),
                    creationDate 
                        timestamp default current_timestamp,
                    updateDate 
                        timestamp default current_timestamp on update current_timestamp
                )           
            `
        );

        // Questions
        await connection.query(
                
            `
                CREATE TABLE if not exists questions (

                    id 
                        int unsigned auto_increment primary key,
                    userID 
                        int unsigned,
                    title 
                        varchar (200) not null,
                    body 
                        varchar (3000) not null,
                    file 
                        varchar(500),
                    languages
                        set ('html', 'css', 'javascript', 'mysql', 'python', 'react', 'vue' ) not null,
                    tags 
                        varchar (200),
                    status
                        enum ('open', 'pending', 'closed') default 'open',
                    views
                        int unsigned,
                    closeDate
                        date,
                    creationDate 
                        timestamp default current_timestamp,
                    updateDate
                        timestamp default current_timestamp on update current_timestamp,

                    constraint question_userID_fk1
                        foreign key (userID) references users (id) on delete cascade,
                    constraint questionID_userID_unique
                        unique (id, userID)	
                )           
            `

            // Pablo. On delete cascade o set null?
        );

        // Answers
        await connection.query(
                
            `
                CREATE TABLE if not exists answers (

                    id 
                        int unsigned auto_increment primary key,
                    questionID 
                        int unsigned,
                    userID 
                        int unsigned,
                    body 
                        text not null,
                    file 
                        varchar(500),
                    creationDate 
                        timestamp default current_timestamp,
                    updateDate 
                        timestamp default current_timestamp on update current_timestamp,

                    constraint answer_questionID_fk1
                        foreign key(questionID) references questions (id) on delete cascade,
                    constraint answer_userID_fk2
                        foreign key(userID) references users (id) on delete cascade
        
                )           
            `
        );

        // Votes
        await connection.query(
                
            `
                CREATE TABLE if not exists votes (

                    id
                        int unsigned auto_increment primary key,
                    answerID
                        int unsigned,
                    userID 
                        int unsigned,
                    value 
                        tinyint default 0,
                    creationDate 
                        timestamp default current_timestamp,
                    updateDate 
                        timestamp default current_timestamp on update current_timestamp,

                    constraint votes_id_answer_fk1
                        foreign key(answerID) references answers (id) on delete cascade,
                    constraint votes_id_user_fk2
                        foreign key(userID) references users (id) on delete cascade
 
                )           
            `
            // Pablo. En lugar de un ID propio, clave compuesta answerID, userID
            // Pablo. Value tinyint o boolean, como prefiráis
        );
            
        // Languages
        await connection.query(

            `
                CREATE TABLE if not exists languages (
                    
                    id 
                        int unsigned auto_increment primary key,
                    name
                        varchar(200) not null unique
                )
            `
        )

        // Off Users
        await connection.query(
            
            `
                CREATE TABLE if not exists offUsers (

                    id 
                        int unsigned auto_increment primary key,
                    userID 
                        int unsigned,
                    reason 
                        varchar(500),
                        
                    constraint offUser_userID_fk1
                        foreign key (userID) references users (id) on delete cascade,
                    constraint offUser_userID_unique
                        unique (userID, id)

                )
            `
        )
    
        // Crear Admin
        console.log('Creating admin')

        const encryptedPass = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

        // Admin
        
        await connection.query(

            `
                INSERT INTO users (

                    creationDate, 
                    updateDate, 
                    email, 
                    username, 
                    birthDate, 
                    country, 
                    password, 
                    role, 
                    active
                )

                VALUES ( 
                    
                    UTC_TIMESTAMP, 
                    UTC_TIMESTAMP, 
                    '${process.env.EMAIL}', 
                    '${process.env.ADMIN}', 
                    '1000-01-01',
                    'Spain', 
                    '${encryptedPass}', 
                    'admin',
                    1 
                )
            `
        )

        // Dummies
        console.log('Creating dummy users');

        await connection.query(
            
            `
                INSERT INTO users (

                    creationDate, 
                    updateDate, 
                    email, 
                    username, 
                    birthDate, 
                    country, 
                    password, 
                    role, 
                    active
                )

                VALUES ( 

                    UTC_TIMESTAMP, 
                    UTC_TIMESTAMP, 
                    'pepito@preguntify.com', 
                    'pepito2021', 
                    '1000-01-01',
                    'Spain', 
                    '${encryptedPass}', 
                    'student',
                    1 

                )
            `
        )

        await connection.query(
            
            `
                INSERT INTO users (

                    creationDate, 
                    updateDate, 
                    email, 
                    username, 
                    birthDate, 
                    country, 
                    password, 
                    role, 
                    active
                )

                VALUES ( 

                    UTC_TIMESTAMP, 
                    UTC_TIMESTAMP, 
                    'manolito@preguntify.com', 
                    'manolito89', 
                    '1000-01-01',
                    'Spain', 
                    '${encryptedPass}', 
                    'student',
                    1 

                )
            `
        )

        await connection.query(
            
            `
                INSERT INTO users (

                    creationDate, 
                    updateDate, 
                    email, 
                    username, 
                    birthDate, 
                    country, 
                    password, 
                    role, 
                    active
                )

                VALUES ( 

                    UTC_TIMESTAMP, 
                    UTC_TIMESTAMP, 
                    'joselito@preguntify.com', 
                    'joselito2021', 
                    '1000-01-01',
                    'Spain', 
                    '${encryptedPass}', 
                    'student',
                    1 

                )
            `
        )

        await connection.query(
            
            `
                INSERT INTO users (

                    creationDate, 
                    updateDate, 
                    email, 
                    username, 
                    birthDate, 
                    country, 
                    password, 
                    role, 
                    active
                )

                VALUES ( 

                    UTC_TIMESTAMP, 
                    UTC_TIMESTAMP, 
                    'mar@preguntify.com', 
                    'marpreguntify', 
                    '1000-01-01',
                    'Spain',
                    '${encryptedPass}', 
                    'expert',
                    1 

                )
            `
        )

    } 
    
    catch (e) {

        console.log('Some error ocurred: ', e)
    
    } 

    finally {

        console.log('Ready');
        
        if (connection) {
          connection.release();
        }   
        process.exit();
    }
}

(async () => {
  await main()
})()