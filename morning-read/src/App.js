import City from './components/City/City';
import Header from './components/Header/Header';
import News from './components/News/News';
import Tasks from './components/Tasks/Tasks';
import './styles/main.scss';

function App() {
  return (
    <body className="app">
      <div className="app__wrapper">
        <Header />
        <City />
        <Tasks />
        <News />
      </div>
    </body>
  );
}

export default App;
