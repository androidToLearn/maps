import { createRoot } from "react-dom/client";
import "./index.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import TilePage from "../../web/src/pages/Tile.tsx";
import AdminPage from "../../web/src/pages/Admin.tsx";
import Register from "./components/Register.tsx";
import SignIn from "./components/SignIn.tsx";
import ProtectedTiles from "./proteteds/protectedTiles.tsx";
import ProtectedAdmin from "./proteteds/protectedAdmin.tsx";
import Content from "../../web/src/pages/Content.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(

  
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedTiles>
              <Content />
            </ProtectedTiles>
          }
        >
          <Route path="/tilePage" element={<TilePage />} />
          <Route
            path="/adminPage"
            element={
              <ProtectedAdmin>
                <AdminPage />
              </ProtectedAdmin>
            }
          />
        </Route>
        <Route />
        <Route path="*" element={<Navigate to={"/signIn"} />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);
