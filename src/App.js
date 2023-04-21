import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CoverGenerator from './components/CoverGenerator/CoverGenerator';
import './styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path='/view' element={<CoverGenerator/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
