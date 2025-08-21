import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/AuthPorvider';
import EditPage from './pages/EditPage';
import AddPage from './pages/AddPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/edit/:id'
            element={<EditPage />}
          />
          <Route
            path='/add'
            element={<AddPage />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
