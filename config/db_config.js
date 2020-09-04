module.exports = {
    appName : "Lofty Logistics",
    mysql : {
        "DB_NAME" : (process.env.NODE_ENV == 'test') ? "loft_test" : "loft_server",
        "DB_PASSWORD" : "root",
        "DB_USER" : "root",
        "DB_HOST" : "localhost",
        "DB_PORT" : 3306,
        "DIALECT" : "mysql"
    }
}