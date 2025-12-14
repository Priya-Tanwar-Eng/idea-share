import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddIdea from "./pages/AddIdea";
import EditIdea from "./pages/EditIdea";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddIdea /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditIdea /></ProtectedRoute>} />
      </Routes>
        <ToastContainer />
    </BrowserRouter>
  );
}

// function RootEntry() {
//   const { user, loading } = useContext(AuthContext);
//   if (loading) return <div>Loading...</div>;
//   return user ? <Home /> : <Signup />;
// }

export default App;
