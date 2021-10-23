const Store = require('electron-store');

const store = new Store();

const prefix = 'MyShare'

const hasStorage = (key) => {
    return store.has(`${prefix}-${key}`)
}

const setStorage = (key, value) => {
    store.set(`${prefix}-${key}`, value)
}

const getStorage = (key, defaultValue) => {
    if (!hasStorage(key)) return defaultValue
    return store.get(`${prefix}-${key}`)
}

const deleteStorage = (key) => {
    store.delete(`${prefix}-${key}`)
}

const clearStorage = () => {
    store.clear()
}

module.exports = {
    get store() {
        return store
    },
    hasStorage,
    setStorage,
    getStorage,
    deleteStorage,
    clearStorage,
}