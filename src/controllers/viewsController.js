export const renderHome = (req, res) => {
  const user = { name: 'Guest', role: 'guest' };
  //console.log(req.user);
  res.render('home', { title: 'Inicio', user: /*req.user ||*/ user });
};

export const renderAbout = (req, res) => {
  res.render('about', { title: 'Acerca de' });
};

export const loginView = (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
}