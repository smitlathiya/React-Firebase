import './App.css';
import MainPanel from './MainPanel';
import Signup from './component/Signup';
import Login from './component/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from './component/pageNotFound';
import { AuthProvider } from './contenxt/AuthContext';
import PrivateRoute from './component/PrivateRoute';
import ForgotPassword from './component/ForgotPassword';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/*"
              element={
                <PrivateRoute>
                  <MainPanel />
                </PrivateRoute>} />
            <Route path='signup'
              element={<Signup />} />
            <Route path='login'
              element={<Login />} />
            <Route path='forgotpassword'
              element={<ForgotPassword />} />
            <Route path='*'
              element={<PageNotFound />} />
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;