// src/useGlobal/index.tsx
import { createContext, useContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var DEFAULT_GLOBAL_DATA = {
  baseUrl: ""
};
var GlobalContext = createContext([DEFAULT_GLOBAL_DATA, () => {
}]);
var GlobalProvider = ({ children, initGlobalData }) => /* @__PURE__ */ jsx(GlobalContext.Provider, { value: useState(initGlobalData), children });
var useGlobalData = () => useContext(GlobalContext);

// src/useHttp/index.tsx
import {
  useState as useState2
} from "react";
import axios from "axios";
var useHttp = ({
  url,
  method = "get",
  data,
  headers
}) => {
  const [{ baseUrl }, _] = useGlobalData();
  const [state, setState] = useState2({
    loading: false,
    error: null,
    data: null,
    code: null
  });
  const fetchData = async () => {
    try {
      setState({
        ...state,
        loading: true,
        error: null,
        code: 0
      });
      const response = await axios({
        url: `${baseUrl}${url}`,
        method,
        ...method === "get" ? {
          params: data
        } : {
          data
        },
        headers: {
          ...headers
        }
      });
      setState({
        loading: false,
        error: null,
        code: 200,
        data: response.data
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.response.data.meta.message || error.message,
        code: error.response.status,
        data: null
      });
    }
  };
  return {
    ...state,
    fetchData
  };
};
export {
  GlobalProvider,
  useGlobalData,
  useHttp
};
