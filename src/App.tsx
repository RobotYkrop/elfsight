import app from './App.module.scss';
import CharList from './components/charList/charList';
import Panel from './components/filterPanel/panel';

function App() {
  return (
    <div className={app['app']}>
      <Panel />
      <CharList />
    </div>
  );
}

export default App;
