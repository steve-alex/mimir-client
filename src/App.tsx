import React, { useState } from 'react';
import styled from 'styled-components';
import { Login, Signup } from './components/Auth';
import WelcomePage from './components/WelcomePage';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5ff;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  padding: 32px;
`;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  padding: 32px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 36px;
  color: #6c5ce7;
  font-weight: bold;
`;

const FormToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const FormToggleBtn = styled.button`
  background-color: transparent;
  color: #6c5ce7;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #a29bfe;
  }
`;


const App = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = () => {
    setIsLoginFormVisible((prevValue) => !prevValue);
  };

  const logout = () => {
    setIsLoggedIn(false);
  }

  return (
    <Container>
      {
        isLoggedIn ? (
          <MainPageWrapper>
            <WelcomePage logout={logout}></WelcomePage>
          </MainPageWrapper>
        ) : (
          <FormWrapper>
            <Title>{isLoginFormVisible ? 'Log in' : 'Sign up'}</Title>
            {isLoginFormVisible ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Signup setIsLoggedIn={setIsLoggedIn} />}
            <FormToggleWrapper>
              <FormToggleBtn onClick={toggleForm}>
                {isLoginFormVisible ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
              </FormToggleBtn>
            </FormToggleWrapper>
          </FormWrapper>
        )
      }
    </Container>
  );
};

export default App;
