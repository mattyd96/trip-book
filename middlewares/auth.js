

const authMiddleware = {}


authMiddleware.authorize = async (req, res, next) => {

    const sessionToken = req.cookies['session_token']

    if (!sessionToken) {
        // If the cookie is not set, return an unauthorized status
        res.status(401).end()
        return
    }

    next()
}

module.exports = authMiddleware