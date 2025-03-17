import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import PetProfileList from "./pages/PetProfileList";
import ScanRecordLog from "./pages/ScanRecordLog";
import ContactList from "./pages/ContactList";
import Overview from "./pages/Overview";
import PublicPetProfile from "./pages/PublicPetProfile";
import PetDetails from "./pages/PetDetails";
import EditPet from "./pages/EditPet";
import CreatePet from "./pages/CreatePet";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import WebSocketNotifications from "./components/WebSocketNotifications";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router basename="/ms1">
      <ConditionalWebSocket />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/pets" element={<PetProfileList />} />
          <Route path="/contact" element={<ContactList />} />
          <Route path="/history" element={<ScanRecordLog />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/pets/:petId" element={<PetDetails />} />
          <Route path="/pets/:petId/edit" element={<EditPet />} />
          <Route path="/create" element={<CreatePet />} />
        </Route>
        <Route path="/public/:profileUrl" element={<PublicPetProfile />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

const ConditionalWebSocket = () => {
  const location = useLocation();
  const excludedPaths = ["/login", "/register"];

  const isExcluded = excludedPaths.includes(location.pathname) || location.pathname.startsWith("/public/");

  return !isExcluded ? <WebSocketNotifications /> : null;
};

export default App;
