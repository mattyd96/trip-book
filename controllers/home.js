module.exports = {
  // render home/signup page
  renderHome: (req, res) => {
    res.render('home', { logged_in: req.session.logged_in });
  }
}