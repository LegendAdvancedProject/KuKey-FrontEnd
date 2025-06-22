import { createBrowserRouter } from 'react-router';
import KonkukStudentAuth from '../../pages/auth-request/KonkukStudentAuth';
import AdminLogin from '../../pages/admin-login/AdminLogin';
import UserLayout from '../../pages/UserLayout';
import AdminLayout from '../../pages/AdminLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
  },
  {
    path: '/admin',
    element: <AdminLayout />
  },
  {
    path: '/konkuk-student-auth',
    element: <KonkukStudentAuth />,
  },
  {
    path: '/admin-login',
    element: <AdminLogin />,
  },
]);

export default router;
