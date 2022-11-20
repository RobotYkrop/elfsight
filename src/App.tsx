import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import app from './App.module.scss';
import CharList from './components/charList/charList';
import Panel from './components/filterPanel/panel';
import { typeStore } from './types/types';

function App() {
  const isOpen = useSelector((state: typeStore) => state.rickAndMorti.isOpen);
  return (
    <div className={app['app']}>
      <Panel />
      <CharList />
      {isOpen && <Outlet />}
    </div>
  );
}

export default App;
