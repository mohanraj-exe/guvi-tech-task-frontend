import React from 'react';
import HomePage from './pages/Home.page';
import ProfilePage from './pages/Profile.page';

import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from 'react-router-dom';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Link to="/" style={{visibility: "hidden"}}>Home page</Link>
        <Link to="/profile" style={{visibility: "hidden"}}>Profile</Link>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
