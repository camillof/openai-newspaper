import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CoverGenerator from './components/CoverGenerator/CoverGenerator';
import './styles.scss';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className='content'>
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route path='/view' element={<CoverGenerator/>} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
