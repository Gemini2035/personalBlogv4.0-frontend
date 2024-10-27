import { GlobalProvider, GlobalData } from "@packages/hooks";

const initGlobalData: GlobalData = {
  baseUrl: import.meta.env.BASE_URL
}

function App() {
  return (
    <GlobalProvider initGlobalData={initGlobalData}>
      111
    </GlobalProvider>
  )
}

export default App
