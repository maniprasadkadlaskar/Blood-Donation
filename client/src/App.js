import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/register';
import SignUp from './components/Authenticate/signup';
import SignIn from './components/Authenticate/signin';
import Donate from './pages/donate';
import { useState } from 'react';
import PrivateRoute from './config/privateroute';
import AuthContext from './config/context';

const App = () => {

  const [user, setUser] = useState({
    email: "mk@gmail.com",
    token: "xsderecfsdrs"
  });


  return (
    <BrowserRouter>
      <AuthContext.Provider value={user}>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/register' element={<Register />} />
            <Route path='/donate' element={<Donate />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
