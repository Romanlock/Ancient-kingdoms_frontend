export const nameMatching = (name: string): string =>
  name === ''
    ? name
    : name === 'kingdom'
    ? 'Княжества'
    : name === 'application'
    ? 'Записи'
    : name === 'login'
    ? 'Вход'
    : name === 'signup'
    ? 'Регистрация'
    : name === 'application_moderator'
    ? 'Записи пользователей'
    : name;
    