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
  RouteProviderWithRouter: () => RouteProviderWithRouter,
  useGlobal: () => useGlobal,
  useHelmet: () => useHelmet,
  useHttp: () => useHttp,
  usePermission: () => usePermission,
  useRoute: () => useRoute
});
module.exports = __toCommonJS(src_exports);

// src/useGlobal/index.tsx
var import_react4 = require("react");

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

// src/useGlobal/hooks/usePermissionHook.tsx
var import_react3 = require("react");

// src/useHttp/index.tsx
var import_react2 = require("react");
var import_axios = __toESM(require("axios"), 1);
var useHttp = ({
  url,
  method = "get",
  data,
  headers
}) => {
  const { GlobalConfig: { baseUrl } } = useGlobal();
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

// src/useGlobal/hooks/usePermissionHook.tsx
var usePermissionHook = (token, baseUrl) => {
  const {
    fetchData: fetchPermission,
    data: permissionData
    // code: permissionResponseCode
  } = useHttp({
    url: baseUrl + "/permission",
    data: { token }
  });
  (0, import_react3.useEffect)(() => {
    fetchPermission();
  }, [token]);
  return {
    permissionData,
    reloadPermission: fetchPermission
  };
};

// src/useGlobal/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var DEFAULT_GLOBAL_DATA = {
  baseUrl: ""
};
var GlobalContext = (0, import_react4.createContext)({
  GlobalConfig: DEFAULT_GLOBAL_DATA,
  setHelmet: () => {
  },
  reloadGlobal: () => {
  },
  permissionList: []
});
var GlobalProvider = ({ children, initGlobalData }) => {
  const [helmetContent, setHelmetContent] = (0, import_react4.useState)([]);
  const token = (0, import_react4.useMemo)(() => "hahaha", []);
  const {
    permissionData,
    reloadPermission
  } = usePermissionHook(token, initGlobalData.baseUrl);
  const { BlogHelmet } = useHelmet(helmetContent);
  const reloadGlobal = () => {
    reloadPermission();
  };
  const providerValues = (0, import_react4.useMemo)(() => ({
    GlobalConfig: initGlobalData,
    setHelmet: setHelmetContent,
    reloadGlobal,
    permissionList: permissionData || []
  }), [setHelmetContent, permissionData, initGlobalData]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(GlobalContext.Provider, { value: providerValues, children: [
    BlogHelmet,
    children
  ] });
};
var useGlobal = () => (0, import_react4.useContext)(GlobalContext);

// src/usePermission/index.tsx
var import_react5 = require("react");
var usePermission = () => {
  const { permissionList } = useGlobal();
  const checkPermission = (0, import_react5.useCallback)((permissionRequire) => {
    const permissionsDeny = permissionRequire.filter((permission) => permissionList.includes(permission));
    return {
      status: !permissionsDeny.length,
      permissionsDeny
    };
  }, [permissionList]);
  return {
    checkPermission
  };
};

// src/useRoute/index.tsx
var import_react6 = require("react");
var import_react_router_dom = require("react-router-dom");
var import_jsx_runtime3 = require("react/jsx-runtime");
var RouteContext = (0, import_react6.createContext)({
  renderedRoutes: null,
  navigate: () => {
  },
  currentLocation: {}
});
var RouteProviderWithRouter = (props) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.BrowserRouter, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RouteProvider, { ...props }) });
var RouteProvider = ({ routes, children }) => {
  const { pathname } = (0, import_react_router_dom.useLocation)();
  const __navigate = (0, import_react_router_dom.useNavigate)();
  const { checkPermission } = usePermission();
  const findRouteItemByPathName = (0, import_react6.useCallback)((targetPath) => {
    const result = routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, "(\\w+)")}$`).test(targetPath));
    if (!result) {
      __navigate({ pathname: "error" });
      return {};
    }
    return result;
  }, [routes, __navigate]);
  const navigate = (0, import_react6.useCallback)(({ pathname: pathname2, ...restPathFields }) => {
    const targetRouteItem = findRouteItemByPathName(pathname2);
    const { permissionRequire } = targetRouteItem;
    const { status } = checkPermission(permissionRequire || []);
    if (status) __navigate({ pathname: pathname2, ...restPathFields });
    else __navigate({ pathname: "error" });
  }, [findRouteItemByPathName, checkPermission, __navigate]);
  const currentLocation = (0, import_react6.useMemo)(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName]);
  const renderedRoutes = (0, import_react6.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Routes, { children: routes.map((route, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Route, { errorElement: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_router_dom.Navigate, { to: { pathname: "/error" } }), ...route }, index)) }), [routes]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RouteContext.Provider, { value: { renderedRoutes, navigate, currentLocation }, children });
};
var useRoute = () => (0, import_react6.useContext)(RouteContext);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalProvider,
  RouteProviderWithRouter,
  useGlobal,
  useHelmet,
  useHttp,
  usePermission,
  useRoute
});
