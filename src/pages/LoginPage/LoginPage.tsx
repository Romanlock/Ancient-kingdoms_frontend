import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Image, Form,  } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';


import { useAuth } from "../../hooks/useAuth";
import { LoginCarousel } from "../../components/UI/Carousel/Carousel";
import MyModal from "../../components/UI/Modal/Modal";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');

  const navigate = useNavigate();

  const { isAuthorized, login } = useAuth();


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthorized) navigate('/kingdom');
  }, [isAuthorized]);

  async function loginUser() {
    if (username.length < 8) {
      setModalText('Имя пользователя должно содержать не менее 8 символов');
      setModalShow(true);
      
      return;
    }

    if (password.length < 8) {
      setModalText('Пароль должен содержать не менее 8 символов');
      setModalShow(true);

      return;
    }

    const errorMessage = await login(username, password)
    if (errorMessage) {
      setModalText(errorMessage);
      setModalShow(true);
    }
  }

  return (
    <div className="login_page">
      <MyModal 
        title={'Ошибка при авторизации'}
        text={'Детали ошибки:'}
        error={modalText}
        show={modalShow}
        onHide={() => { setModalShow(false) }}
      />
      <Row>
        <Col xs={4} className="login_page__login">
          <Row className="login_page__fields">
            <Image src="src/assets/img/logo.jpg" className="login_page__login-img" />
            <span className="text-h2-medium login_page__welcome-text">Добро пожаловать</span>
            <Form>
              <Form.Group className="mb-3" controlId="loginUsernameInput">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="text" 
                  placeholder="Введите имя пользователя"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginPasswordInput">
                <Form.Label>Пароль</Form.Label>
                <div className="login_page__password-input">
                  <Form.Control type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={handlePasswordChage}
                  />
                  <span onClick={togglePasswordVisibility} 
                    className="login_page__password-toggle-icon">
                      {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                </div>
              </Form.Group>
              <div className="login_page__btn">
                <Button className="login_page__login-btn" 
                  variant="primary"
                  onClick={loginUser}
                >
                  Войти
                </Button>                
              </div>
            </Form>
            
            <span className="text-base1-medium login_page__login-text">Еще нет аккаунта?</span>
            <a onClick={() => navigate('/signup')}  className="text-base1-medium login_page__login-link">Регистрация</a>
          </Row>
        </Col>
        <Col xs={8} >
          <LoginCarousel />
        </Col>
      </Row>
    </div>    
  );
}

export default LoginPage;
