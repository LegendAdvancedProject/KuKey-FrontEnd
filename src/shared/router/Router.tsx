import { createBrowserRouter } from 'react-router';
import KeyLocationPage from '../../pages/auth-keyLoacation/AuthKeyLocation';
import KeyRegisterPage from '../../pages/auth-ketRegister/AuthKeyRegister';
import Home from '../../pages/main/Home';
import KonkukStudentAuth from '../../pages/auth-request/KonkukStudentAuth';
import AdminLogin from '../../pages/admin-login/AdminLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/konkuk-student-auth',
    element: <KonkukStudentAuth />,
  },
  {
    path: '/location',
    element: <KeyLocationPage />,
  },
  {
    path: '/register',
    element: <KeyRegisterPage />,
  },
  {
    path: '/admin-login',
    element: <AdminLogin />
  }
]);

export default router;
