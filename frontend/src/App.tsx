import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from "./components/Appbar";
import AppRoutes from "./routes/AppRoutes";

import { UserDataProvider } from "./context/UserDataContext";

const App: React.FC = () => {
  return (
    <UserDataProvider>
    <Router>
      <AppBar />
      <AppRoutes />
    </Router>
    </UserDataProvider>
  );
};

export default App;
