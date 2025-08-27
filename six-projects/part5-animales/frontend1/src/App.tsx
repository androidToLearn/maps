import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../src/pages/Home.tsx'
import Description from './pages/Description.tsx';
import Animals from '../src/pages/Animals.tsx'
import Adopt from '../src/pages/Adopt.tsx'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/description/:id" element= {<Description/>}/>
          <Route path="/animals" element= {<Animals/>}/>
          <Route path="/adopt/:id" element= {<Adopt/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
