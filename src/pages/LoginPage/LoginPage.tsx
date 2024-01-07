import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Image, Form,  } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { useAuth } from "../../hooks/useAuth";
import { LoginCarousel } from "../../components/UI/Carousel/Carousel";
import MyModal from "../../components/UI/Modal/Modal";
import { useApp } from "../../hooks/useApp";
import { errorMatching } from "../../utils/errorMatching/errorMatching";


const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const navigate = useNavigate();

  const { isAuthorized, login } = useAuth();

  const { setCurrentPage, deleteCurrentPage } = useApp();

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
    setCurrentPage('Вход');
  }, [])

  useEffect(() => {
    if (isAuthorized) navigate('/kingdom');

    return () => {
      deleteCurrentPage();
    }
  }, [isAuthorized]);

  async function loginUser() {
    if (username.length < 8) {
      setModalTitle('Ошибка');
      setModalText('Имя пользователя должно содержать не менее 8 символов');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);
      
      return;
    }

    if (password.length < 8) {
      setModalTitle('Ошибка');
      setModalText('Пароль должен содержать не менее 8 символов')
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);

      return;
    }

    const errorMessage = await login(username, password)
    if (errorMessage) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки')
      setModalError(errorMatching(errorMessage));
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);  
    }
  }

  if (modalShow) {
    return (
      <MyModal 
        title={modalTitle}
        text={modalText}
        error={modalError}
        show={modalShow}
        variant={modalVariant}
        canselText={modalCanselText}
        saveText={modalSaveText}
        onHide={() => {
          setModalTitle('');
          setModalText('');
          setModalError('');
          setModalVariant('');
          setModalCanselText('');
          setModalSaveText('');
          setModalShow(false);
        }}
      />
    );
  }

  return (
    <div className="login_page">
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
