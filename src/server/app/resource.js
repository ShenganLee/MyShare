const storage = require('./store')
const { RESOURCEKEY } = require('./util')

const addResource = (resource) => {
    const resourceList = storage.getStorage(RESOURCEKEY, [])

    const newIdSet = new Set(resource.map(res => res.id))
    const oldIdSet = new Set(resourceList.map(res => res.id))

    const idSet = new Set(Array.from(newIdSet).concat(Array.from(oldIdSet)))

    const resourceMap = new Map()

    resourceList.forEach(res => {
        resourceMap.set(res.id, res)
    })

    resource.forEach(res => {
        resourceMap.set(res.id, res)
    })

    const newResourceList = Array.from(idSet).map(id => resourceMap.get(id))
    storage.setStorage(RESOURCEKEY, newResourceList)
}

const deleteResource = (ids) => {
    const resourceList = storage.getStorage(RESOURCEKEY, [])

    const idSet = new Set(ids)

    const newResourceList = resourceList.map(res => !idSet.has(res.id))
    storage.setStorage(RESOURCEKEY, newResourceList)
}

module.exports = {
    addResource,
    deleteResource,
}