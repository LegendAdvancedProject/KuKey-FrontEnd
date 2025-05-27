import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KeyLocationPage from '../../pages/auth-keyLoacation/AuthKeyLocation';
import KeyRegisterPage from '../../pages/auth-ketRegister/AuthKeyRegister';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/location" element={<KeyLocationPage />} />
        <Route path="/register" element={<KeyRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
