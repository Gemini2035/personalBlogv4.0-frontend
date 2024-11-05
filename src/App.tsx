import { GlobalProvider, GlobalData, RouteProvider, TranslateProvider, PermissionProvider } from "@packages/hooks";
import { routes } from "./routes";
import { BlogFrame } from "./components";
import resources from './config/locales.json'

const initGlobalData: GlobalData = {
  baseUrl: import.meta.env.VITE_BASE_URL
}

// TODO: TOKEN storage about
const token = ""

function App() {
  return (
    <GlobalProvider initGlobalData={initGlobalData}>
      <TranslateProvider resources={resources}>
        <PermissionProvider token={token}>
          <RouteProvider routes={routes}>
            <BlogFrame />
          </RouteProvider>
        </PermissionProvider>
      </TranslateProvider>
    </GlobalProvider>
  )
}

export default App
