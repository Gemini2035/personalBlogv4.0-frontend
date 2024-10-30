import { GlobalProvider, GlobalData, RouteProviderWithRouter } from "@packages/hooks";
import { routes } from "./routes";

const initGlobalData: GlobalData = {
  baseUrl: import.meta.env.VITE_BASE_URL
}

function App() {
  return (
    <GlobalProvider initGlobalData={initGlobalData}>
      <RouteProviderWithRouter routes={routes}>
        <></>
      </RouteProviderWithRouter>
    </GlobalProvider>
  )
}

export default App
