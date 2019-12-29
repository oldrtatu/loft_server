module.exports = {
    onAdd: (requestBody) => {
        let data = {
            firstName: requestBody.firstName || null,
            lastName: requestBody.lastName || null,
            email: requestBody.email || null,
            password: requestBody.password || null
        }

        return data
    },

    onUpdate: (requestBody) => {
        let data = { ...requestBody }

        if (!data.id) return null

        let id = data.uid

        delete data.id

        if (data.uid) delete data.uid

        return { data, id }

    }
}