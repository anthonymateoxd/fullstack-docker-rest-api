import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthPorvider';
import '../style/UserDetailPage.css';

function UserDetailPage() {
  const { id } = useParams();
  const { putUserPage, getUserPage, user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    contrasena: '',
    email: '',
    date: '',
  });

  useEffect(() => {
    getUserPage(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      setInputs({
        id: user.id || '',
        name: user.nombre || '',
        contrasena: user.contrasena || '',
        email: user.email || '',
        date: user.fecha_registro ? user.fecha_registro.split('T')[0] : '',
      });
    }
  }, [user]);

  const handleBack = () => navigate('/');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await putUserPage(
        {
          id: id,
          nombre: inputs.name,
          contrasena: inputs.contrasena,
          email: inputs.email,
          fecha_registro: inputs.date,
        },
        id
      );
      navigate('/');
    } catch (error) {
      console.error('Update failed:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='user-detail-container'>
      <div className='user-detail-card'>
        <h1 className='user-detail-title'>Detalles del Usuario</h1>

        <form
          onSubmit={handleSubmit}
          className='user-detail-form'
        >
          <h2 className='section-title'>Información Básica</h2>

          <div className='form-row'>
            <label
              htmlFor='name'
              className='form-label'
            >
              Nombre:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={inputs.name}
              placeholder={inputs.name}
              onChange={handleInputChange}
              className='form-input'
            />
          </div>

          <div className='form-row'>
            <label
              htmlFor='contrasena'
              className='form-label'
            >
              Contraseña:
            </label>
            <input
              type='password'
              id='contrasena'
              name='contrasena'
              value={inputs.contrasena}
              onChange={handleInputChange}
              className='form-input'
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
              onChange={handleInputChange}
              className='form-input'
            />
          </div>
          <div className='button-group'>
            <button
              type='button'
              onClick={handleBack}
              className='secondary-button'
            >
              Volver
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='primary-button'
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetailPage;
