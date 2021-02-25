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
        await connection.query("DROP TABLE IF EXISTS users_languages CASCADE");
        await connection.query("DROP TABLE IF EXISTS questions_languages CASCADE");
        await connection.query("SET FOREIGN_KEY_CHECKS = 1");

        console.log('Setting Max Connections');
        await connection.query('SET GLOBAL max_connections = 1000');

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
                        varchar(500) default 'images/profile/avatar-default.jpg',
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

        // Languages
        await connection.query(

            `
                CREATE TABLE if not exists languages (

                    id
                        int unsigned auto_increment primary key,
                    name
                        varchar(100) not null unique,
                    creationDate 
                        timestamp default current_timestamp,
                    updateDate 
                        timestamp default current_timestamp on update current_timestamp

                )
            `            
        )

        // Join Tables

            // Users/Languages
            await connection.query(

                `
                    CREATE TABLE if not exists users_languages (

                        userID
                            int unsigned,
                        languageID
                            int unsigned,

                        PRIMARY KEY(userID, languageID),

                        constraint users_languages_user_fk1
                            foreign key(userID) references users (id) on delete cascade,
                        constraint users_languages_language_fk2
                            foreign key(languageID) references languages (id) on delete cascade
                    )
                `
            )

            // Questions/Languages
            await connection.query(

                `
                    CREATE TABLE if not exists questions_languages (

                        questionID
                            int unsigned,
                        languageID
                            int unsigned,
                            
                        PRIMARY KEY(questionID, languageID),

                        constraint questions_languages_question_fk1
                            foreign key(questionID) references questions (id) on delete cascade,
                        constraint questions_languages_language_fk2
                            foreign key(languageID) references languages (id) on delete cascade
                    )
                `
            )

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
                    parentID
                        int unsigned null,
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
                        foreign key(userID) references users (id) on delete cascade,
                    constraint answer_parentID_fk3
                        foreign key(parentID) references answers (id) on delete cascade
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
                        boolean default 0,
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
        );
            
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
                    creationDate 
                        timestamp default current_timestamp,
                    updateDate 
                        timestamp default current_timestamp on update current_timestamp,
                        
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