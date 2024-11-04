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
  PermissionProvider: () => PermissionProvider,
  RouteProvider: () => RouteProvider,
  TranslateProvider: () => TranslateProvider,
  useGlobal: () => useGlobal,
  useHelmet: () => useHelmet,
  useHttp: () => useHttp,
  usePermission: () => usePermission,
  useRoute: () => useRoute,
  useTranslation: () => import_react_i18next.useTranslation
});
module.exports = __toCommonJS(src_exports);

// src/useGlobal/index.tsx
var import_react2 = require("react");

// src/useHelmet/index.tsx
var import_react_helmet = require("react-helmet");
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var renderHelmetItem = (type, props) => {
  const key = JSON.stringify(props || "") + type;
  try {
    switch (type) {
      case "meta": {
        return /* @__PURE__ */ (0, import_react.createElement)("meta", { ...props, key });
      }
      case "title": {
        const { content, ...restFeilds } = props;
        return /* @__PURE__ */ (0, import_react.createElement)("title", { ...restFeilds, key }, content);
      }
      case "link": {
        return /* @__PURE__ */ (0, import_react.createElement)("link", { ...props, key });
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
};
var useHelmet = (helmetContent) => ({
  BlogHelmet: !!helmetContent?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_helmet.Helmet, { children: helmetContent.map(({ type, props }) => renderHelmetItem(type, props)) })
});

// src/useGlobal/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var DEFAULT_GLOBAL_DATA = {
  baseUrl: ""
};
var GlobalContext = (0, import_react2.createContext)({
  GlobalConfig: DEFAULT_GLOBAL_DATA,
  setHelmet: () => {
  }
});
var GlobalProvider = ({ children, initGlobalData }) => {
  const [helmetContent, setHelmetContent] = (0, import_react2.useState)([]);
  const { BlogHelmet } = useHelmet(helmetContent);
  const providerValues = (0, import_react2.useMemo)(() => ({
    GlobalConfig: initGlobalData,
    setHelmet: setHelmetContent
  }), [setHelmetContent, initGlobalData]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GlobalContext.Provider, { value: providerValues, children: [
    BlogHelmet,
    children
  ] });
};
var useGlobal = () => (0, import_react2.useContext)(GlobalContext);

// src/useHttp/index.tsx
var import_react3 = require("react");
var import_axios = __toESM(require("axios"), 1);

// src/useHttp/utils/index.ts
var generateSecureHeader = (data) => {
  const {
    userAgent,
    languages,
    platform
  } = navigator;
  return encodeURIComponent(JSON.stringify({
    userAgent,
    languages,
    platform,
    ...data
  }));
};

// src/useHttp/index.tsx
var useHttp = ({
  url,
  method = "get",
  data,
  headers
}) => {
  const { GlobalConfig: { baseUrl } } = useGlobal();
  const [state, setState] = (0, import_react3.useState)({
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
          ...headers,
          [Math.floor((/* @__PURE__ */ new Date()).setSeconds(0, 0) / 1e3)]: generateSecureHeader(data)
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
        error: error?.response?.data?.meta?.message || error?.message || "unknown error!",
        code: error?.response?.status || -1,
        data: null
      });
    }
  };
  return {
    ...state,
    fetchData
  };
};

// src/usePermission/index.tsx
var import_react4 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var PermissionContext = (0, import_react4.createContext)({
  hasPermission: () => ({ status: false, permissionsDeny: [] }),
  permissionList: [],
  reloadPermission: () => {
  }
});
var PermissionProvider = ({ token, children }) => {
  const {
    fetchData: fetchPermission,
    data: permissionData
    // code: permissionResponseCode
  } = useHttp({
    url: "/permission",
    data: { token }
  });
  (0, import_react4.useEffect)(() => {
    fetchPermission();
  }, [token]);
  const hasPermission = (0, import_react4.useCallback)((permissionRequire = []) => {
    const permissionsDeny = permissionRequire.filter((permission) => permissionData?.includes(permission)) || [];
    return {
      status: !permissionsDeny,
      permissionsDeny
    };
  }, [permissionData]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PermissionContext.Provider, { value: {
    permissionList: permissionData || [],
    hasPermission,
    reloadPermission: fetchPermission
  }, children });
};
var usePermission = () => (0, import_react4.useContext)(PermissionContext);

// src/useRoute/index.tsx
var import_react5 = require("react");
var import_react_router_dom = require("react-router-dom");
var import_jsx_runtime4 = require("react/jsx-runtime");
var RouteContext = (0, import_react5.createContext)({
  renderedRoutes: null,
  navigate: () => {
  },
  currentLocation: {},
  getRouteParams: () => ({})
});
var RouteProvider = (props) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_router_dom.BrowserRouter, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RouteProviderCore, { ...props }) });
var RouteProviderCore = ({ routes, children }) => {
  const { pathname, state } = (0, import_react_router_dom.useLocation)();
  const __navigate = (0, import_react_router_dom.useNavigate)();
  const { hasPermission } = usePermission();
  const findRouteItemByPathName = (0, import_react5.useCallback)((targetPath) => {
    const result = routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, "(\\w+)")}$`).test(targetPath));
    if (!result) {
      __navigate({ pathname: "error" });
      return {};
    }
    return result;
  }, [routes, __navigate]);
  const navigate = (0, import_react5.useCallback)(({ pathname: pathname2, ...restPathFields }) => {
    const targetRouteItem = findRouteItemByPathName(pathname2);
    const { permissionRequire } = targetRouteItem;
    const { status } = hasPermission(permissionRequire);
    if (status) __navigate({ pathname: pathname2, ...restPathFields });
    else __navigate({ pathname: "error" });
  }, [findRouteItemByPathName, hasPermission, __navigate]);
  const currentLocation = (0, import_react5.useMemo)(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName]);
  const getRouteParams = (0, import_react5.useCallback)(() => state, []);
  const renderedRoutes = (0, import_react5.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_router_dom.Routes, { children: routes.map((route, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_router_dom.Route, { errorElement: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_router_dom.Navigate, { to: { pathname: "/error" } }), ...route }, index)) }), [routes]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RouteContext.Provider, { value: {
    renderedRoutes,
    navigate,
    currentLocation,
    getRouteParams
  }, children });
};
var useRoute = () => (0, import_react5.useContext)(RouteContext);

// src/useTranslate/index.tsx
var import_react_i18next = require("react-i18next");
var import_i18next_browser_languagedetector = __toESM(require("i18next-browser-languagedetector"), 1);
var import_i18next = __toESM(require("i18next"), 1);
var import_jsx_runtime5 = require("react/jsx-runtime");
var TranslateProvider = ({ children, resources, lng = "zh" }) => {
  import_i18next.default.use(import_i18next_browser_languagedetector.default).use(import_react_i18next.initReactI18next).init({
    resources,
    lng,
    fallbackLng: lng,
    interpolation: {
      escapeValue: false
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react_i18next.I18nextProvider, { i18n: import_i18next.default, children });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalProvider,
  PermissionProvider,
  RouteProvider,
  TranslateProvider,
  useGlobal,
  useHelmet,
  useHttp,
  usePermission,
  useRoute,
  useTranslation
});
