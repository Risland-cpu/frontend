// import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import MainRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

export default App;
