const config = {
    'development': {
        'ENVIRONMENT': 'development',
        'PORT': 82,
        'DB_URI': 'mongodb://localhost:27017/mcfly',
        'HOST':'http://localhost:8000/'
    },
    'preproduction': {
        'ENVIRONMENT': 'preproduction',
        'PORT': 82,
        'DB_URI': 'mongodb://localhost:27017/mcfly',
        'HOST':'http://localhost/'
    }
};
module.exports = config[process.env.NODE_ENV || 'development'];