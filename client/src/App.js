import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/register';
import SignUp from './components/Authenticate/signup';
import SignIn from './components/Authenticate/signin';
import Donate from './pages/donate';
import Home from './pages/home';
import { useState } from 'react';
import PrivateRoute from './config/privateroute';
import AuthContext from './config/context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard';
import About from './components/Dashboard/about';
import Registration from './components/Dashboard/registration';
import DetailEdit from './components/Dashboard/edit';

const App = () => {

  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }} >
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/register' element={<Register />} />
            <Route path='/donate' element={<Donate />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard' element={<About />} />
              <Route path='/dashboard/registrations' element={<Registration />} />
              <Route path='/dashboard/edit' element={<DetailEdit />} />
            </Route>
          </Route>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
