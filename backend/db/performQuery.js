// Conectarse a BD
const getConnection = require('./getConnection');



const performQuery = async query => {

    let connection;
    let result;

    console.log(`Performing Query: ${query}`)

    try {

        connection = await getConnection();

        [result] = await connection.query(query)

    }

    catch (e) {
        
        throw new Error('Database Error')
        
    }
    
    finally {
        
        if (connection) {
            connection.release()
        }

        return result

    }
    
}

module.exports = performQuery