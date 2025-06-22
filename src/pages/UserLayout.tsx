import Header from '../shared/components/User/Header';
import NavigationBar from '../shared/components/User/NavigationBar';
import Reserve from './reserve/Reserve_TEMP';
import Home from './main/Home';
import { useState } from 'react';

const UserLayout = () => {
  const [selected, setSelected] = useState<'space' | 'reserve'>('space');

  return (
    <div className="flex w-full flex-col">
      <Header />
      <NavigationBar selected={selected} setSelected={setSelected} />
      <main>{selected === 'space' ? <Home /> : <Reserve />}</main>
    </div>
  );
};

export default UserLayout;
