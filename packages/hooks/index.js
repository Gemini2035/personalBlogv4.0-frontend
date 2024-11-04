// src/useGlobal/index.tsx
import { createContext, useContext, useMemo, useState } from "react";

// src/useHelmet/index.tsx
import { Helmet } from "react-helmet";
import { jsx } from "react/jsx-runtime";
import { createElement } from "react";
var renderHelmetItem = (type, props) => {
  const key = JSON.stringify(props || "") + type;
  try {
    switch (type) {
      case "meta": {
        return /* @__PURE__ */ createElement("meta", { ...props, key });
      }
      case "title": {
        const { content, ...restFeilds } = props;
        return /* @__PURE__ */ createElement("title", { ...restFeilds, key }, content);
      }
      case "link": {
        return /* @__PURE__ */ createElement("link", { ...props, key });
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
};
var useHelmet = (helmetContent) => ({
  BlogHelmet: !!helmetContent?.length && /* @__PURE__ */ jsx(Helmet, { children: helmetContent.map(({ type, props }) => renderHelmetItem(type, props)) })
});

// src/useGlobal/index.tsx
import { jsxs } from "react/jsx-runtime";
var DEFAULT_GLOBAL_DATA = {
  baseUrl: ""
};
var GlobalContext = createContext({
  GlobalConfig: DEFAULT_GLOBAL_DATA,
  setHelmet: () => {
  }
});
var GlobalProvider = ({ children, initGlobalData }) => {
  const [helmetContent, setHelmetContent] = useState([]);
  const { BlogHelmet } = useHelmet(helmetContent);
  const providerValues = useMemo(() => ({
    GlobalConfig: initGlobalData,
    setHelmet: setHelmetContent
  }), [setHelmetContent, initGlobalData]);
  return /* @__PURE__ */ jsxs(GlobalContext.Provider, { value: providerValues, children: [
    BlogHelmet,
    children
  ] });
};
var useGlobal = () => useContext(GlobalContext);

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
  const { GlobalConfig: { baseUrl } } = useGlobal();
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
import { createContext as createContext2, useCallback, useContext as useContext2, useEffect } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var PermissionContext = createContext2({
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
  useEffect(() => {
    fetchPermission();
  }, [token]);
  const hasPermission = useCallback((permissionRequire = []) => {
    const permissionsDeny = permissionRequire.filter((permission) => permissionData?.includes(permission)) || [];
    return {
      status: !permissionsDeny,
      permissionsDeny
    };
  }, [permissionData]);
  return /* @__PURE__ */ jsx2(PermissionContext.Provider, { value: {
    permissionList: permissionData || [],
    hasPermission,
    reloadPermission: fetchPermission
  }, children });
};
var usePermission = () => useContext2(PermissionContext);

// src/useRoute/index.tsx
import { createContext as createContext3, useCallback as useCallback2, useContext as useContext3, useMemo as useMemo2 } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { jsx as jsx3 } from "react/jsx-runtime";
var RouteContext = createContext3({
  renderedRoutes: null,
  navigate: () => {
  },
  currentLocation: {},
  getRouteParams: () => ({})
});
var RouteProvider = (props) => /* @__PURE__ */ jsx3(BrowserRouter, { children: /* @__PURE__ */ jsx3(RouteProviderCore, { ...props }) });
var RouteProviderCore = ({ routes, children }) => {
  const { pathname, state } = useLocation();
  const __navigate = useNavigate();
  const { hasPermission } = usePermission();
  const findRouteItemByPathName = useCallback2((targetPath) => {
    const result = routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, "(\\w+)")}$`).test(targetPath));
    if (!result) {
      __navigate({ pathname: "error" });
      return {};
    }
    return result;
  }, [routes, __navigate]);
  const navigate = useCallback2(({ pathname: pathname2, ...restPathFields }) => {
    const targetRouteItem = findRouteItemByPathName(pathname2);
    const { permissionRequire } = targetRouteItem;
    const { status } = hasPermission(permissionRequire);
    if (status) __navigate({ pathname: pathname2, ...restPathFields });
    else __navigate({ pathname: "error" });
  }, [findRouteItemByPathName, hasPermission, __navigate]);
  const currentLocation = useMemo2(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName]);
  const getRouteParams = useCallback2(() => state, []);
  const renderedRoutes = useMemo2(() => /* @__PURE__ */ jsx3(Routes, { children: routes.map((route, index) => /* @__PURE__ */ jsx3(Route, { errorElement: /* @__PURE__ */ jsx3(Navigate, { to: { pathname: "/error" } }), ...route }, index)) }), [routes]);
  return /* @__PURE__ */ jsx3(RouteContext.Provider, { value: {
    renderedRoutes,
    navigate,
    currentLocation,
    getRouteParams
  }, children });
};
var useRoute = () => useContext3(RouteContext);

// src/useTranslate/index.tsx
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { jsx as jsx4 } from "react/jsx-runtime";
var TranslateProvider = ({ children, resources, lng = "zh" }) => {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: lng,
    interpolation: {
      escapeValue: false
    }
  });
  return /* @__PURE__ */ jsx4(I18nextProvider, { i18n, children });
};
export {
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
};
