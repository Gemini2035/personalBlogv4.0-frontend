import { GlobalProvider, GlobalData, RouteProvider, TranslateProvider } from "@packages/hooks";
import { routes } from "./routes";
import { BlogFrame } from "./components";
import resources from '../public/locales.json'

const initGlobalData: GlobalData = {
  baseUrl: import.meta.env.VITE_BASE_URL
}


function App() {
  return (
    <GlobalProvider initGlobalData={initGlobalData}>
      <TranslateProvider resources={resources}>
        <RouteProvider routes={routes}>
          <BlogFrame />
        </RouteProvider>
      </TranslateProvider>
    </GlobalProvider>
  )
}

export default App
