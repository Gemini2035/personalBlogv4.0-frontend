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
import { createContext as createContext2, useCallback, useContext as useContext2, useEffect } from "react";
import { Fragment, jsx as jsx2 } from "react/jsx-runtime";
var PermissionContext = createContext2({
  hasPermission: () => ({ status: false, permissionsDeny: [] }),
  permissionList: [],
  reloadPermission: () => {
  }
});
var PermissionProvider = ({ token, children, fallback }) => {
  const {
    loading: permissionLoading,
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
  }, children: permissionLoading ? fallback || /* @__PURE__ */ jsx2(Fragment, { children: "getting permissions..." }) : children });
};
var usePermission = () => useContext2(PermissionContext);

// src/useRoute/index.tsx
import { createContext as createContext3, useCallback as useCallback2, useContext as useContext3, useEffect as useEffect2, useMemo as useMemo2 } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

// src/useTranslate/index.tsx
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { Trans } from "react-i18next";
import { jsx as jsx3 } from "react/jsx-runtime";
var TranslateProvider = ({ children, resources, lng = "zh" }) => {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: lng,
    interpolation: {
      escapeValue: false
    }
  });
  return /* @__PURE__ */ jsx3(I18nextProvider, { i18n, children });
};

// src/useRoute/index.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var RouteContext = createContext3({
  renderedRoutes: null,
  navigate: () => {
  },
  currentLocation: {},
  getRouteParams: () => ({})
});
var RouteProvider = (props) => /* @__PURE__ */ jsx4(BrowserRouter, { children: /* @__PURE__ */ jsx4(RouteProviderCore, { ...props }) });
var RouteProviderCore = ({ routes, children }) => {
  const { pathname, state } = useLocation();
  const __navigate = useNavigate();
  const { hasPermission } = usePermission();
  const { t } = useTranslation();
  const findRouteItemByPathName = useCallback2((targetPath) => routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, "(\\w+)")}$`).test(targetPath)), [routes, __navigate]);
  const navigate = useCallback2((props) => {
    if (typeof props === "number") __navigate(props);
    else {
      const { pathname: pathname2, ...restPathFields } = props;
      const targetRouteItem = findRouteItemByPathName(pathname2);
      if (!targetRouteItem) return;
      const { permissionRequire } = targetRouteItem;
      const { status, permissionsDeny } = hasPermission(permissionRequire);
      if (status) __navigate({ pathname: pathname2, ...restPathFields });
      else __navigate({ pathname: "error" }, {
        state: {
          title: t("Permission deny"),
          content: `${t("Required permission(s)")}: ${permissionsDeny.join(", ")}`
        }
      });
    }
  }, [findRouteItemByPathName, hasPermission, __navigate, t]);
  const currentLocation = useMemo2(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName]);
  const getRouteParams = useCallback2(() => state, []);
  const renderedRoutes = useMemo2(() => /* @__PURE__ */ jsx4(Routes, { children: routes.map((route, index) => /* @__PURE__ */ jsx4(Route, { errorElement: /* @__PURE__ */ jsx4(Navigate, { to: { pathname: "/error" } }), ...route }, index)) }), [routes]);
  useEffect2(() => {
    if (!findRouteItemByPathName(pathname)) __navigate(
      { pathname: "error" },
      {
        state: {
          title: t("404 page not found"),
          content: t(`This site doesn't have this route!`)
        }
      }
    );
  }, [pathname, findRouteItemByPathName]);
  return /* @__PURE__ */ jsx4(RouteContext.Provider, { value: {
    renderedRoutes,
    navigate,
    currentLocation,
    getRouteParams
  }, children });
};
var useRoute = () => useContext3(RouteContext);
export {
  GlobalProvider,
  PermissionProvider,
  RouteProvider,
  Trans,
  TranslateProvider,
  useGlobal,
  useHelmet,
  useHttp,
  usePermission,
  useRoute,
  useTranslation
};
