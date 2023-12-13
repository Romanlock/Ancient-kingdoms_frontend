import { CheckLoginResponce } from "../../api/AuthorizationApi/AuthorizationResponceInterface";

export function mockedCheckLoginResponce() {
  const CheckLoginResponce: CheckLoginResponce = {
    Code: 503,
    Status: 'service unavailable',
    Message: 'Нет ответа от сервера',
    Body: null,
  }

  return CheckLoginResponce;
}