import { Routes, Route } from 'react-router-dom';
import './App.css';
import { FavouritePage } from '../../react-stek/src/pages/FavouritePage';
import { HomePage } from '../../react-stek/src/pages/HomePage';
import { Navigation } from './components/Navigation';

export function App() {
  return (
    <>
      <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/favourites' element={<FavouritePage/>} />
      </Routes>
      </>
  );
}

