module.exports = {
  renderHome: (req, res) => {
    res.render('index', { logged_in: true });
  }
}