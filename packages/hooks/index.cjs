"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  GlobalProvider: () => GlobalProvider,
  useGlobalData: () => useGlobalData,
  useHttp: () => useHttp
});
module.exports = __toCommonJS(src_exports);

// src/useGlobal/index.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_GLOBAL_DATA = {
  baseUrl: ""
};
var GlobalContext = (0, import_react.createContext)([DEFAULT_GLOBAL_DATA, () => {
}]);
var GlobalProvider = ({ children, initGlobalData }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalContext.Provider, { value: (0, import_react.useState)(initGlobalData), children });
var useGlobalData = () => (0, import_react.useContext)(GlobalContext);

// src/useHttp/index.tsx
var import_react2 = require("react");
var import_axios = __toESM(require("axios"), 1);
var useHttp = ({
  url,
  method = "get",
  data,
  headers
}) => {
  const [{ baseUrl }, _] = useGlobalData();
  const [state, setState] = (0, import_react2.useState)({
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
      const response = await (0, import_axios.default)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalProvider,
  useGlobalData,
  useHttp
});
