const getVoteQuery = data => {

    const query = 
    
        `
            SELECT * FROM votes WHERE id = ${data.voteID}
        `

    return query

}

module.exports = getVoteQuery;