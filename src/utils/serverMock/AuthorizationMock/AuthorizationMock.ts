import { CheckLoginResponce } from "../../api/ResponseInterface";

export function mockedCheckLoginResponce() {
  const CheckLoginResponce: CheckLoginResponce = {
    Code: 503,
    Status: 'service unavailable',
    Message: 'Нет ответа от сервера',
    Body: null,
  }

  return CheckLoginResponce;
}