import Header from '../shared/components/Header';
import NavigationBar from '../shared/components/NavigationBar';
import Home from './main/Home';
import { useState } from 'react';
import Reserve from './reserve/reserve';

const UserLayout = () => {
  const [selected, setSelected] = useState<'space' | 'reserve'>('space');

  return (
    <div className="flex w-full flex-col">
      <Header />
      <NavigationBar selected={selected} setSelected={setSelected} />
      <main>
        {selected === 'space' ? <Home /> : <Reserve />}
      </main>
    </div>
  );
};

export default UserLayout;