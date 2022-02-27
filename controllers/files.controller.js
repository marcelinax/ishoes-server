const errors = require("../errors/errors");
const filesService = require("../services/files.service");

const getFile = async (req, res) => {
    try {
        const { fileName } = req.params;
        res.status(201).end(filesService.getFileByFileName(fileName));
    } catch (error) {
        res.status(404).json({ message: errors.CANNOT_FIND_FILE });
    }
    
};

const uploadFile = async (req, res) => {
    try {
        const file = req.files.file;
        res.status(201).json({ url: filesService.uploadFile(file) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getFile,
    uploadFile
}