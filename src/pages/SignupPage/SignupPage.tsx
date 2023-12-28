import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Image, Form,  } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { useAuth } from "../../hooks/useAuth";
import { SignupCarousel } from "../../components/UI/Carousel/Carousel";
import MyModal from "../../components/UI/Modal/Modal";


const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');

  const navigate = useNavigate();

  const { isAuthorized, signup } = useAuth();


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handlePasswordRepeatChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordRepeat(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  useEffect(() => {
    if (isAuthorized) navigate('/kingdom');
  }, [isAuthorized]);

  async function signupUser() {
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

    if (password !== passwordRepeat) {
      setModalText('Пароли не совпадают');
      setModalShow(true);

      return;
    }

    const errorMessage = await signup(username, password)
    if (errorMessage) {
      setModalText(errorMessage);
      setModalShow(true);
    }
  }

  return (
    <div className="signup_page">
      <MyModal 
        title={'Ошибка при регистрации'}
        text={'Детали ошибки:'}
        error={modalText}
        show={modalShow}
        onHide={() => { setModalShow(false) }}
      />
      <Row>
        <Col xs={4} className="signup_page__signup">
          <Row className="signup_page__fields">
            <Image src="src/assets/img/logo.jpg" className="signup_page__signup-img" />
            <span className="text-h2-medium signup_page__welcome-text">Регистрация</span>
            <Form>
              <Form.Group className="mb-3" controlId="signupUsernameInput">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="text" 
                  placeholder="Введите имя пользователя"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupPasswordInput">
                <Form.Label>Пароль</Form.Label>
                <div className="signup_page__password-input">
                  <Form.Control type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={handlePasswordChage}
                  />
                  <span onClick={togglePasswordVisibility} 
                    className="signup_page__password-toggle-icon">
                      {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupPasswordRepeat">
                <Form.Label>Повтор пароля</Form.Label>
                <div className="signup_page__password-repeat">
                  <Form.Control type={showPasswordRepeat ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    value={passwordRepeat}
                    onChange={handlePasswordRepeatChage}
                  />
                  <span onClick={togglePasswordVisibilityRepeat} 
                    className="signup_page__password-toggle-icon">
                      {showPasswordRepeat ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                </div>
              </Form.Group>
              <div className="signup_page__btn">
                <Button className="signup_page__signup-btn" 
                  variant="primary"
                  onClick={signupUser}
                >
                  Зарегистрироваться
                </Button>                
              </div>
            </Form>
            <span className="text-base1-medium signup_page__signup-text">Уже есть аккаунт?</span>
            <a onClick={() => navigate('/login')}  className="text-base1-medium signup_page__signup-link">Войти</a>
          </Row>
        </Col>
        <Col xs={8} >
          <SignupCarousel />
        </Col>
      </Row>
    </div>    
  );
}

export default SignupPage;
