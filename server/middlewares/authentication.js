require('dotenv').config()
const {verify} = require('../helpers/jwt')

module.exports = function authentication(req,res,next){
    try {
        console.log(req.headers)
        req.user = verify(req.headers.access_token)
        next()
    } catch (error) {
        err = {
            status:403,
            msg: 'Forbidden tralalala'
        }
        next(err)
    }
}