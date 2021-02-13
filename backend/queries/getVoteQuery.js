const getVoteQuery = data => {

    console.log('Getting Vote From Database');

    let query;

    if (data.userID && data.answerID) {

        query = 
    
        `
            SELECT * FROM votes WHERE userID = ${data.userID} AND answerID = ${data.answerID}
        `

    }

    if(data.voteID) {

        query = 
        
        `
           SELECT * FROM votes WHERE id = ${data.voteID}
        `
        
    }

    return query

}

module.exports = getVoteQuery;