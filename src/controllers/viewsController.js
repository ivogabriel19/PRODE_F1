export const renderHome = (req, res) => {
  const user = { name: 'Juan' };
  res.render('home', { title: 'Inicio', user });
};

export const renderAbout = (req, res) => {
  res.render('about', { title: 'Acerca de' });
};
