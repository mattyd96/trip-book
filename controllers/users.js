const { User } = require('../models');

const createErrorMessage = errors => {
  const resError = {
    errorList: []
  }

  errors.forEach(err => {
    resError.errorList.push(err.path);
  });

  return resError;
};

module.exports = {
  login: async (req, res) => {
    // see if username exists
    const usernameExists = await User.findOne({   
      where: { username: req.body.id.trim() }
    });

    // see if email exists
    const emailExists = await User.findOne({   
      where: { email: req.body.id.trim() }
    });

    // get user if there is one that matches
    const user =  usernameExists ? usernameExists : 
                  emailExists ? emailExists :
                  null;
           
    if(user) {
      // check password match
      const passMatch = await user.checkPassword(req.body.password.trim());

      if(passMatch) {
        // create session
        req.session.save(() => {
          req.session.user_id = user.id;
          req.session.logged_in = true;
          res.redirect('/');
        });
      }
    } else {
      // send error back to client
      res.status(500).json({
        errorList: ['login']
      });
    }
  },

  // log user out
  logout: (req, res) => {
    // destroy session
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  // signup the user
  signup: async (req, res) => {

    const errorList = [];

    try {

      // see if username already exists
      const usernameExists = await User.findOne({   
        where: { username: req.body.username.trim() }
      });

      // if it does return error message
      if (usernameExists) {
        errorList.push('username exists')
      } 

      if (req.body.username.length === 0) {
        errorList.push('username')
      }

      // see if email already exists
      const emailExists = await User.findOne({   
        where: { email: req.body.email.trim() }
      });

      // if it does return error message
      if (emailExists) {
        errorList.push('email exists')
      }

      // Create New user
      const newUser = await User.create({
        username: req.body.username.trim(),
        email: req.body.email.trim(),
        password: req.body.password.trim()
      });

      // create session
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        res.redirect('/');
      });

    } catch (err) {
      // create errorlist and send back to client
      let error = createErrorMessage(err.errors);
      error.errorList = error.errorList.concat(errorList);
      res.status(500).json(error);
    }
    
  },
}