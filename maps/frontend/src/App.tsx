import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./reduxes/StoreNeighboard";
import { Provider } from "react-redux";
import AllProject from "./pages/allProject/AllProject";
import { AuthContext } from "./provider/AuthContext";
import MosadContext from "./provider/MosadContext";
import ShchunaContext from "./provider/ShchunaContext";
import StateContext from "./provider/StateContext";
import TypeSelectedCompon from "./provider/TypeContext";
import TypeSearchCompon from "./provider/TypeSearchContext";
import SchoolToFill from "./provider/ScoolToFillContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <ShchunaContext>
        <MosadContext>
          <TypeSelectedCompon>
            <SchoolToFill>
              <StateContext>
                <TypeSearchCompon>
                  <QueryClientProvider client={queryClient}>
                    <AuthContext>
                      <AllProject />
                    </AuthContext>
                  </QueryClientProvider>
                </TypeSearchCompon>
              </StateContext>
            </SchoolToFill>
          </TypeSelectedCompon>
        </MosadContext>
      </ShchunaContext>
    </Provider>
  );
}

export default App;
