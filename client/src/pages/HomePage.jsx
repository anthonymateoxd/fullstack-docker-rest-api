import { useEffect } from 'react';
import { useAuth } from '../context/AuthPorvider'; // Check spelling: should be AuthProvider
import '../style/HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { deleteUserPage, getUsersPage, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUsersPage();
  }, []);

  const handleEdit = id => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async id_usuario => {
    await deleteUserPage(id_usuario);
    navigate(0);
  };

  const handleAdd = () => {
    navigate('/add');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <button
        className='btn-delete'
        onClick={() => handleAdd()}
      >
        Add+
      </button>
      <h1 className='text-2xl font-bold mb-6'>Lista de Usuarios</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-2 px-4 border-b'>ID</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>Fecha de Registro</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {user && user.length > 0 ? (
              user.map(usuario => (
                <tr
                  key={usuario.id_usuario}
                  className='hover:bg-gray-50'
                >
                  <td className='py-2 px-4 border-b text-center'>
                    {usuario.id_usuario}
                  </td>
                  <td className='py-2 px-4 border-b'>{usuario.nombre}</td>
                  <td className='py-2 px-4 border-b'>{usuario.email}</td>
                  <td className='py-2 px-4 border-b'>
                    {new Date(usuario.fecha_registro).toLocaleDateString()}
                  </td>
                  <td className='py-2 px-4 border-b text-center'>
                    <button
                      className='btn-edit mr-2'
                      onClick={() => handleEdit(usuario.id_usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className='btn-delete'
                      onClick={() => handleDelete(usuario.id_usuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan='5'
                  className='text-center py-4 text-gray-500'
                >
                  No hay usuarios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
