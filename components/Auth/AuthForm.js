import { useState } from "react";
import styled from "styled-components";
import { StyledButton } from "@/components/StyledButton";
import { getCsrfToken, getProviders, signIn, getSession} from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthForm({ formName, csrfToken, providers }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const router = useRouter();
  async function addUser(userData) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(null);
      return setMessage(data.message);
    }
    if (response.ok) {
      return router.push("/");
    }
  }

  async function loginUser({ email, password }) {
    setEmail({ email });
    setPassword({ password })

    const options = {
      redirect: false,
      email,
      password
    }

    const response = await signIn('credentials', options)
    setMessage(null);
    if (response?.error) {
      setMessage(response.error)
    }

    if(!response.error) {
      return router.push("/");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    const { email, password } = userData;

    if (isLogin) {
      await loginUser({ email, password })
    } else {
      await addUser(userData)
    }
  }

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <StyledLoginForm>
      <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <StyledForm aria-labelledby={formName} onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        {!isLogin &&
          <StyledFormElement>
            <label htmlFor="name">User Name:</label>
            <input type="text" name="name" id="name" required />
          </StyledFormElement>
        }
        <StyledFormElement>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required />
        </StyledFormElement>
        <StyledFormElement>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required />
        </StyledFormElement>
        {message && <StyledError>{message}</StyledError>}
        <StyledFormActions>
          <StyledButton variant={'secondary'}>{isLogin ? 'Sign In' : 'Create Account'}</StyledButton>
          <StyledButton
            type={'button'}
            variant={'primary'}
            onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Sign in with existing account'}
          </StyledButton>
        </StyledFormActions>
      </StyledForm>
    </StyledLoginForm>
  )
}

const StyledLoginForm = styled.div`
  width: 90vw;
  max-width: 430px;
  padding: 10px 15px;
  margin: 0 auto;
  background-color: #3a4a57;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledFormElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  
  label {
    font-size: .75rem;
    font-weight: 500;
    color: #f1f1f1;
  }
  input {
    height: 40px;
    line-height: 40px;
    padding: 5px 10px;
  }
`

const StyledFormActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1.25rem;
  button {
    margin: .5rem 0;
    cursor: pointer;
  }
`;

const StyledError = styled.p`
  padding: 0;
  margin: 0;
  color: orange;
  font-weight: bold;
`;