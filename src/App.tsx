import { GlobalProvider, GlobalData, RouteProvider, TranslateProvider, PermissionProvider } from "@packages/hooks";
import { routes } from "./routes";
import { BlogFrame } from "./components";
import resources from './config/locales.json'
import themes from './config/themes.json'
import { ThemeProvider } from "@packages/ui";

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
          <ThemeProvider<typeof themes> themes={themes} listenerDisabled>
            <RouteProvider routes={routes}>
              <BlogFrame />
            </RouteProvider>
          </ThemeProvider>
        </PermissionProvider>
      </TranslateProvider>
    </GlobalProvider>
  )
}

export default App
