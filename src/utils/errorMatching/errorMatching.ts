export const errorMatching = (serverError: string): string =>
  serverError === ''
    ? serverError
    : serverError === 'error getting necessary applications: no necessary ruler applications found'
    ? 'У вас пока нет записей'
    : serverError === 'error getting necessary kingdoms: no necessary kingdoms found'
    ? 'Требуемое княжество не найдено'
    : serverError === 'error getting user by name: record not found'
    ? 'Пользователь не найден'
    : serverError === 'incorrect user data'
    ? 'Неверный пароль'
    : serverError === 'error creating user entity: user already existed'
    ? 'Пользователь уже зарегистрирован'
    : serverError === 'error getting necessary kingdoms from application: no necessary ruler applications found'
    ? 'Заявка не найдена'
    : serverError;
    
    