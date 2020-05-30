const fse = require('fs-extra')

try {
    fse.copySync('./Build', 'C:/KJ/ReactAPI2/wwwroot')
    console.log('success!')
} catch (err) {
    console.error(err)
}