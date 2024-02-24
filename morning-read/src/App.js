import City from './components/City/City';
import Header from './components/Header/Header';
import News from './components/News/News';
import './styles/main.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <City />
      <News />
    </div>
  );
}

export default App;
