import { useState } from 'react';
import { useAuth } from '../context/AuthPorvider';
import { useNavigate } from 'react-router-dom';
import '../style/AddPage.css';

export default function AddPage() {
  const { addUserPage } = useAuth();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    nombre: '',
    contrasena: '',
    email: '',
    fecha_registro: new Date().toISOString(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addUserPage({
        ...inputs,
        fecha_registro: new Date(inputs.fecha_registro).toISOString(),
      });
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='add-page-container'>
      <div className='register-card'>
        <div className='register-header'>
          <h2>Register New User</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className='register-form'
        >
          <div className='form-row'>
            <label
              htmlFor='nombre'
              className='form-label'
            >
              Name:
            </label>
            <input
              type='text'
              id='nombre'
              name='nombre'
              value={inputs.nombre}
              onChange={handleChange}
              placeholder='Enter your name'
              className='form-input'
              required
              minLength={2}
              autoComplete='username'
            />
          </div>

          <div className='form-row'>
            <label
              htmlFor='contrasena'
              className='form-label'
            >
              Password:
            </label>
            <input
              type='password'
              id='contrasena'
              name='contrasena'
              value={inputs.contrasena}
              onChange={handleChange}
              placeholder='Enter your password'
              className='form-input'
              required
              minLength={6}
              autoComplete='current-password'
            />
          </div>

          <div className='form-row'>
            <label
              htmlFor='email'
              className='form-label'
            >
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={inputs.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='form-input'
              required
              autoComplete='current-password'
            />
          </div>

          <div className='date-info-container'>
            <p className='date-info'>
              Registration date will be automatically set to current date and
              time
            </p>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='submit-btn'
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <button
            className='submit-btn'
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
