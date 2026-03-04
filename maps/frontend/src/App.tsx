import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./reduxes/StoreNeighboard";
import { Provider } from "react-redux";
import AllProject from "./pages/allProject/AllProject";
import { AuthContext } from "./provider/AuthContext";
import MosadContext from "./provider/MosadContext";
import ShchunaContext from "./provider/ShchunaContext";
import StateContext from "./provider/StateContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <ShchunaContext>
        <MosadContext>
          <StateContext>
            <QueryClientProvider client={queryClient}>
              <AuthContext>
                <AllProject />
              </AuthContext>
            </QueryClientProvider>
          </StateContext>
        </MosadContext>
      </ShchunaContext>
    </Provider>
  );
}

export default App;
