const fs = require('fs');
const path = require('path');

/** 
 * @param fileName {string}
 */
const getFileByFileName = (fileName) => {
    const file = fs.readFileSync(path.resolve('storage/', fileName));
    return file;
};

/** 
 * @param fileName {string}
 */
const uploadFile = (file) => {
    const fileName = file.name;
    file.mv(path.resolve('storage/', fileName));
    return 'files/' + file.name;
};


module.exports = {
    getFileByFileName,
    uploadFile
}