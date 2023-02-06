const validationRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

module.exports = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      }
      if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
      }
      if (!validationRegex.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }
      next();
};
