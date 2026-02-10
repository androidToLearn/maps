import "./index.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import TilePage from "./pages/TilePage/TilePage.tsx";
import AdminPage from "./pages/Admin/Admin.tsx";
import Register from "./components/Register/Register.tsx";
import SignIn from "./components/SignIn/SignIn.tsx";
import ProtectedTiles from "./routes/protectedTiles.tsx";
import ProtectedAdmin from "./routes/protectedAdmin.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Content from "./pages/Content/Context.tsx";
import { UserProvider } from "./provider/AuthContext.tsx";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
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
              <Route index element={<Navigate to="tilePage" replace />} />

              <Route path="tilePage" element={<TilePage />} />
              <Route
                path="adminPage"
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
      </UserProvider>
    </QueryClientProvider>
  );
};
