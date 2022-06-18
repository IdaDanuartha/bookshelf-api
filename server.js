const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async() => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    })

    server.route(routes)

    try {
        await server.start()
        console.log(`Server berjalan pada ${server.info.uri}`)
    } catch (error) {
        console.log(error)
    }
}

init()