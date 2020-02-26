import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { RecipeContext } from '../context/index';

const LoginCard = styled.section`
    max-width:1000px;
    margin:auto;
    font-family: Arial;
    text-align:center;
    background-color:#F7F7F7;
    padding-bottom:2rem;
    padding:2rem;
    height:100vh;

    input {
        display: block;
        margin:auto;
        margin-bottom:2rem;
    }
`;

const Auth = () => {
  const appContext = useContext(RecipeContext);
  const { isLoginMode, changeLoginHandler, setLoggedIn, loggedIn } = appContext;
  const history = useHistory();
  const authSubmitHandler = () => {
    history.push('/user/u1');
    setLoggedIn(true);
    console.log(loggedIn);
  };
  return (
    <>
      <Header />
      <LoginCard>
        {isLoginMode ? <h1>Login</h1> : <h1>Signup</h1>}
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && <input type="text" placeholder="name" />}
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="submit">{isLoginMode ? 'Login' : 'Signup'}</button>
          <p>
            Switch to
            <button type="button" onClick={changeLoginHandler}>{isLoginMode ? 'Signup' : 'Login'}</button>
          </p>
        </form>
      </LoginCard>
    </>
  );
};

export default Auth;
