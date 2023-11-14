import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/homePage/Home';
import Login from 'pages/loginPage/Login';
import Profile from 'pages/profilePage/Profile';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
