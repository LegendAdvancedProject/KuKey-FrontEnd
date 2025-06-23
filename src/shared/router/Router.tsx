import { createBrowserRouter } from 'react-router';
import KonkukStudentAuth from '../../pages/auth-request/KonkukStudentAuth';
import AdminLogin from '../../pages/admin-login/AdminLogin';
import UserLayout from '../../pages/UserLayout';
import AdminLayout from '../../pages/AdminLayout';
import KeyRegister from '../../pages/auth-ketRegister/AuthKeyRegister';
import ReserveHistory from '../../pages/reserve/ReserveHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
  },
  {
    path: '/konkuk-student-auth',
    element: <KonkukStudentAuth />,
  },
  {
    path: '/admin-login',
    element: <AdminLogin />,
  },
  {
    path: '/register',
    element: <KeyRegister />,
  },
  {
    path: '/reserve-history',
    element: <ReserveHistory />,
  },
]);

export default router;
