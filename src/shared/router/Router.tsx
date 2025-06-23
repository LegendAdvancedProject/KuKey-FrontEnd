import { createBrowserRouter } from 'react-router';
import KonkukStudentAuth from '../../pages/auth-request/KonkukStudentAuth';
import AdminLogin from '../../pages/admin-login/AdminLogin';
import UserLayout from '../../pages/UserLayout';
import AdminLayout from '../../pages/AdminLayout';
import KeyRegister from '../../pages/auth-ketRegister/AuthKeyRegister';
import KonkukStudentReserveAuth from '../../pages/reserve/KonkukStudentReserveAuth';
import EnterReserveInfo from '../../pages/reserve/EnterReserveInfo';
import ReserveHistory from '../../pages/reserve/ReserveHistory';
import ReserveAuth from '../../pages/reserve/ReserveAuth';

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
    path: '/student-reserve-auth',
    element: <KonkukStudentReserveAuth />,
  },
  {
    path: '/enter-reserve-info',
    element: <EnterReserveInfo />,
  },
  {
    path: '/reserve-history',
    element: <ReserveHistory />,
  },
  {
    path: 'reserve-auth',
    element: <ReserveAuth />,
  },
]);

export default router;
