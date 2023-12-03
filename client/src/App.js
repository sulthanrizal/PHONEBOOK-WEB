import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';
import ContactBox from "./components/ContactBox";
import ContactAdd from "./components/ContactAdd";
import UpdateAvatar from "./components/UpdateAvatar";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ContactBox />} />
          <Route path="add" element={<ContactAdd />} />
          <Route path="avatar" element={<UpdateAvatar />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <Outlet />
  );
}

// function Home() {
//   return (
//     <ContactBox />
//   );
// }


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}