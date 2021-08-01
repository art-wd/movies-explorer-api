const User = require('../models/user');

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // if (!user) throw new NotFoundError('Пользователь с указанным _id не найден.');
    res.send(user);
  } catch (err) {
    // if (err.name === 'CastError') {
    //   next(new BadRequestError('Передан некорректный _id при получении пользователя.'));
    //   return;
    // }
    next(err);
  }
};

module.exports.updateCurrentUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    // if (!user) throw new NotFoundError('Пользователь с указанным _id не найден.');

    res.send(user);
  } catch (err) {
    // if (err.name === 'CastError') {
    //   next(new BadRequestError('Передан некорректный _id при обновлении профиля.'));
    //   return;
    // }
    // if (err.name === 'ValidationError') {
    //   next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
    //   return;
    // }
    next(err);
  }
};
