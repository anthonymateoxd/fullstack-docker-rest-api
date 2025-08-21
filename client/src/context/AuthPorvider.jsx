import { createContext, useContext, useState } from 'react';
import {
  addRequest,
  deleteRequest,
  getRequest,
  getRequestUser,
  putRequest,
} from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUsers] = useState(null);

  const getUsersPage = async () => {
    try {
      const result = await getRequest();
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserPage = async id => {
    try {
      const result = await getRequestUser(id);
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const putUserPage = async (user, id_usuario) => {
    try {
      const result = await putRequest(user, id_usuario);
      setUsers(result.data); // Update state with the response data
      return result; // Optional, if you want to return the result
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const deleteUserPage = async id_usuario => {
    try {
      const result = await deleteRequest(id_usuario);
      return result;
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  };

  const addUserPage = async user => {
    try {
      const result = await addRequest(user);
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        addUserPage,
        deleteUserPage,
        putUserPage,
        getUserPage,
        getUsersPage,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
