import "./index.css";
import { UserContextProvider } from "./pages/shared/contexts/UserContext";
import { Routes } from "./routes";

const App = () => {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
};

export default App;
