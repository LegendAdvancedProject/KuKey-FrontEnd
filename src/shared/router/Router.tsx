import { createBrowserRouter } from 'react-router';
import KeyLocationPage from '../../pages/auth-keyLoacation/AuthKeyLocation';
import KeyRegisterPage from '../../pages/auth-ketRegister/AuthKeyRegister';
import Home from '../../pages/main/Home';
import KonkukStudentAuth from '../../pages/auth-request/KonkukStudentAuth';
import AdminLogin from '../../pages/admin-login/AdminLogin';
import AdminHome from '../../pages/admin-main/AdminHome';
import UserLayout from '../../pages/UserLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // 시설예약 페이지 추가
    ],
  },
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
    element: <AdminLogin />,
  },
  {
    path: '/admin-home',
    element: <AdminHome />,
  },
]);

export default router;
