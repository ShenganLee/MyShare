const fs = require('fs')
const path = require('path')
const hash = require('object-hash')

const RESOURCETYPE = {
    TEXT: 'text',
    IMAGE: 'image',
    
    FILE: 'file',
    DIRECTORY: 'directory',
}

const AsyncFunc = async (promise) => {
    try {
        const value = await Promise.resolve(promise)
        return [null, value]
    } catch(e) {
        return [e]
    }
}

const getResourceId = (type, value) => hash.MD5({ value, type })

const prevFiles = (filePaths) => {
    return Array.from(filePaths).map(
        filePath => {
            const type = fs.statSync(filePath)
                ? RESOURCETYPE.DIRECTORY : RESOURCETYPE.FILE

            const name = path.basename(filePath)

            return {
                type,
                name: name,
                value: filePath,
                id: getResourceId(type, filePath),
            }
        }
    ).filter(Boolean);
}

module.exports = {
    RESOURCETYPE,
    prevFiles,
    AsyncFunc,
}