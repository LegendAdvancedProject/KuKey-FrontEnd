import { useState } from 'react';
import AdminHeader from '../shared/components/Admin/AdminHeader';
import AdminNavigationBar from '../shared/components/Admin/AdminNavigationBar';
import AdminHome from './admin-main/AdminHome';
import KeyLocationPage from './auth-keyLoacation/AuthKeyLocation';

const AdminLayout = () => {
  const [selected, setSelected] = useState<'space' | 'key'>('space');

  return (
    <div className="flex w-full flex-col">
      <AdminHeader />
      <AdminNavigationBar selected={selected} setSelected={setSelected} />
      <main>{selected === 'space' ? <AdminHome /> : <KeyLocationPage />}</main>
    </div>
  );
};

export default AdminLayout;
