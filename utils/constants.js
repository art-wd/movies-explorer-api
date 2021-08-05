const MONGO_CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const ALLOWED_CORS = [
  'https://chagin.movies.nomoredomains.club',
  'http://chagin.movies.nomoredomains.club',
  'localhost:3000',
];

const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const ROUT_NOT_FOUND_ERROR = 'Запрошен несуществующий роут';
const UNAUTHORIZED_ERROR = 'Необходима авторизация';

const USER_ID_NOT_FOUND_ERROR = 'Пользователь с указанным id не найден';
const USER_ID_BAD_REQUEST_ERROR = 'Передан некорректный id при получении пользователя';
const USER_ID_UPDATE_BAD_REQUEST_ERROR = 'Передан некорректный id при обновлении профиля';
const USER_DATA_UPDATE_BAD_REQUEST_ERROR = 'Переданы некорректные данные при обновлении профиля';

const EMAIL_CONFLICT_ERROR = 'Такой e-mail уже существует';
const USER_DATA_CREATE_BAD_REQUEST_ERROR = 'Переданы некорректные данные при создании пользователя';

const EMAIL_OR_PASSWORD_UNAUTHORIZED_ERROR = 'Неправильные почта или пароль';

const SUCCESSFUL_LOGIN = 'Аутентификация прошла успешно';
const SUCCESSFUL_LOGOUT = 'Выход прошёл успешно';

const FILM_ID_NOT_FOUND_ERROR = 'Фильм с указанным id не найден';
const FILM_ID_DELETE_BAD_REQUEST_ERROR = 'Передан некорректный id фильма';
const FILM_DATA_CREATE_BAD_REQUEST_ERROR = 'Переданы некорректные данные при создании фильма';
const FILM_OWNER_ID_FORBIDDEN_ERROR = 'Чужой фильм';

module.exports = {
  MONGO_CONNECT_OPTIONS,
  ALLOWED_CORS,
  INTERNAL_SERVER_ERROR,
  ROUT_NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  USER_ID_NOT_FOUND_ERROR,
  USER_ID_BAD_REQUEST_ERROR,
  USER_ID_UPDATE_BAD_REQUEST_ERROR,
  USER_DATA_UPDATE_BAD_REQUEST_ERROR,
  EMAIL_CONFLICT_ERROR,
  USER_DATA_CREATE_BAD_REQUEST_ERROR,
  EMAIL_OR_PASSWORD_UNAUTHORIZED_ERROR,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_LOGOUT,
  FILM_DATA_CREATE_BAD_REQUEST_ERROR,
  FILM_ID_NOT_FOUND_ERROR,
  FILM_OWNER_ID_FORBIDDEN_ERROR,
  FILM_ID_DELETE_BAD_REQUEST_ERROR,
};
