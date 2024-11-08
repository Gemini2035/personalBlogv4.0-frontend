import { GlobalProvider, GlobalData, RouteProvider, TranslateProvider, PermissionProvider } from "@packages/hooks";
import { routes } from "./routes";
import { BlogFrame } from "./components";
import resources from './config/locales.json'
import themes from './config/themes.json'
import { ThemeProvider } from "@packages/ui";
import { Loading } from "./components/Loading";

const initGlobalData: GlobalData = {
  baseUrl: import.meta.env.VITE_BASE_URL
}

// TODO: TOKEN storage about
const token = ""

function App() {
  return (
    <GlobalProvider initGlobalData={initGlobalData}>
      <TranslateProvider resources={resources}>
        <ThemeProvider<typeof themes> themes={themes} listenerDisabled>
          <PermissionProvider token={token} fallback={<Loading />}>
            <RouteProvider routes={routes}>
              <BlogFrame />
            </RouteProvider>
          </PermissionProvider>
        </ThemeProvider>
      </TranslateProvider>
    </GlobalProvider>
  )
}

export default App
