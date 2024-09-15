import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import SignUp from './pages/auth/signup/signup';
import SignIn from './pages/auth/signin/signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}

export default App;
