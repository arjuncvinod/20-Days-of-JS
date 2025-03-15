import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/AuthContext';
import { useAuth } from './shared/hooks/auth-hook';


function App() {
  const {token, login, logout, userId} = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token ,userId , login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
