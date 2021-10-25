const fs = require('fs')
const path = require('path')
const hash = require('object-hash')

const RESOURCEKEY = 'resource-list'

const RESOURCETYPE = {
    TEXT: 'text',  // 文字
    IMAGE: 'image', // 图片
    
    FILE: 'file', // 文件
    DIRECTORY: 'directory', // 文件夹

    GROUP: 'group', // 分组
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

const prevImage = (image) => {
    const id = getResourceId(RESOURCETYPE.TEXT, image)
    return {
        id: id,
        value: image,
        name: `${id}.png`,
        type: RESOURCETYPE.IMAGE,
    }
}

const prevText = (text) => {
    return {
        value: text,
        name: text.substr(0, 50),
        type: RESOURCETYPE.TEXT,
        id: getResourceId(RESOURCETYPE.TEXT, text),
    }
}

module.exports = {
    RESOURCEKEY,
    RESOURCETYPE,
    prevFiles,
    prevImage,
    prevText,
    AsyncFunc,
}