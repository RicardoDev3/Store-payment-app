import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Car = React.lazy(() => import('./pages/Carshop/Carshop'))

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Header cartCount={cartCount} />
        <div className='app-content'>
          <Routes>
            <Route path="/" element={<Home setCartCount={setCartCount} />} />
            <Route path='/carshop' element={<Car />} /> 
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App
