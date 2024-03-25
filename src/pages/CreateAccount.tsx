import { registerRequest } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    try {
      const response = await registerRequest(username, password);

      if (response.error) {
        setErrorMessage(response.msg.message);
        return;
      }

      if (response.id) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3500);
      }
    } catch (e) {
      setErrorMessage(e || 'Unknown error occurred.');
    }
  };

  return (
    <>
      <div className='register-container'>
        <span>Join TaePare</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor='user'>Username</label>
          <input type='username' placeholder='username' name='user' />
          <label htmlFor='pass'>Password</label>
          <input type='password' placeholder='*******' name='pass' />

          <button type='submit'>Register</button>
          <Link to='/login'>Have an Account?</Link>
        </form>
        <div className='alert-container'>
          {errorMessage && (
            <div className='alert error'>
              {errorMessage}
              <button onClick={() => setErrorMessage('')}>Close</button>
            </div>
          )}
          {successMessage && (
            <div className='alert success'>{successMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}
