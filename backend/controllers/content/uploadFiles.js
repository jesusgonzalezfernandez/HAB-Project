// const { fileFormat } = require('../../validators/fileFormat')
const uuid = require('uuid');
const fsPromises = require('fs').promises
const performQuery = require ('../../db/performQuery')



const uploadFilesQuery = async (outputFileName) => {

    const query = 
    
        `

            INSERT into questions (

                file 
            
            VALUES (

                ${outputFileName}

            )
        
        `
    
    await performQuery(query)

}



const uploadFiles = async (req,res) => {

    await fsPromises.mkdir(`${process.env.TARGET_FOLDER}/profile`, {recursive:true})
    
    try {

        const fileID = uuid.v4()
        const outputFileName = `${process.env.TARGET_FOLDER}/profile/${fileID}.jpg`

        await fsPromises.writeFile(outputFileName, req.files.imagen.data)
        await uploadFilesQuery (outputFileName)
        res.send('Your question is posted')
        console.log('New question posted')

    } catch (e) {
        
        console.log('Error: ', e)
        res.status(500).send()
    
    }
}

module.exports = uploadFiles