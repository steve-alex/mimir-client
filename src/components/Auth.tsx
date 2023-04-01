import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  padding: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 32px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #ddd;
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
  font-size: 16px;
  transition: border-bottom-color 0.2s ease-in-out;

  &:focus {
    border-bottom-color: #2ecc71;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #27ae60;
  }
`;

const Error = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 16px;
`;

const Signup = ({ setIsLoggedIn }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      const response = await axios.post('http://localhost:3000/auth/signup', { email, password })
      const accessToken = response.data.data.accessToken;
      if (accessToken) setIsLoggedIn(true);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign up for Mimir</Title>
        <form onSubmit={handleSignup}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <Error>{error}</Error>}
          <Button type="submit">Sign up</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

const Login = ({ setIsLoggedIn }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password })
      console.log("🚀 ~ file: Auth.tsx:125 ~ handleLogin ~ response:", response)
      const accessToken = response.data.data.accessToken;
      console.log("🚀 ~ file: Auth.tsx:80 ~ handleSignup ~ accessToken:", accessToken)
      if (accessToken) setIsLoggedIn(true)
    } catch (err: any) {
      console.log("🚀 ~ file: Auth.tsx:131 ~ handleLogin ~ err:", err)
      setError(err.response.data.message)
    }
};

  return (
    <Container>
      <FormWrapper>
        <Title>Welcome back to Mimir</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Error>{error}</Error>}
          <Button type="submit">Log in</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export { Signup, Login };