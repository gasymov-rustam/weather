import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import City from './routes/City';
import Search from './routes/Search';
import Settings from './routes/Settings';

function App() {
  return (
    <>
      <Header />
      <main className="app">
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/city/:cityName">
            <City />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
