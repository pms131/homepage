module.exports = {
    server_port: 3000,
    db_url: 'mongodb://admin:admin@databases-shard-00-00-oroo1.mongodb.net:27017,databases-shard-00-01-oroo1.mongodb.net:27017,databases-shard-00-02-oroo1.mongodb.net:27017/databases?ssl=true&replicaSet=databases-shard-0&authSource=admin',
    db_schemas: [
        {
            file: './user_schema',
            collection: 'users',
            schemaName: 'UserSchema',
            modelName: 'UserModel'
        }
	],
    route_info: [
	    //===== User =====//
        {
            file: './user',
            path: '/process/login',
            method: 'login',
            type: 'post'
        } // user.login 
	    , {
            file: './user',
            path: '/process/adduser',
            method: 'adduser',
            type: 'post'
        } // user.adduser 
	    , {
            file: './user',
            path: '/process/listuser',
            method: 'listuser',
            type: 'post'
        } // user.listuser 
	]
}