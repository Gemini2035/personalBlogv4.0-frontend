// src/useGlobal/index.tsx
import { createContext, useContext, useMemo, useState as useState2 } from "react";

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

// src/useGlobal/hooks/usePermissionHook.tsx
import { useEffect } from "react";

// src/useHttp/index.tsx
import {
  useState
} from "react";
import axios from "axios";
var useHttp = ({
  url,
  method = "get",
  data,
  headers
}) => {
  const { GlobalConfig: { baseUrl } } = useGlobal();
  const [state, setState] = useState({
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
  useEffect(() => {
    fetchPermission();
  }, [token]);
  return {
    permissionData,
    reloadPermission: fetchPermission
  };
};

// src/useGlobal/index.tsx
import { jsxs } from "react/jsx-runtime";
var DEFAULT_GLOBAL_DATA = {
  baseUrl: ""
};
var GlobalContext = createContext({
  GlobalConfig: DEFAULT_GLOBAL_DATA,
  setHelmet: () => {
  },
  reloadGlobal: () => {
  },
  permissionList: []
});
var GlobalProvider = ({ children, initGlobalData }) => {
  const [helmetContent, setHelmetContent] = useState2([]);
  const token = useMemo(() => "hahaha", []);
  const {
    permissionData,
    reloadPermission
  } = usePermissionHook(token, initGlobalData.baseUrl);
  const { BlogHelmet } = useHelmet(helmetContent);
  const reloadGlobal = () => {
    reloadPermission();
  };
  const providerValues = useMemo(() => ({
    GlobalConfig: initGlobalData,
    setHelmet: setHelmetContent,
    reloadGlobal,
    permissionList: permissionData || []
  }), [setHelmetContent, permissionData, initGlobalData]);
  return /* @__PURE__ */ jsxs(GlobalContext.Provider, { value: providerValues, children: [
    BlogHelmet,
    children
  ] });
};
var useGlobal = () => useContext(GlobalContext);

// src/usePermission/index.tsx
import { useCallback } from "react";
var usePermission = () => {
  const { permissionList } = useGlobal();
  const checkPermission = useCallback((permissionRequire) => {
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
import { createContext as createContext2, useCallback as useCallback2, useContext as useContext2, useMemo as useMemo2 } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { jsx as jsx2 } from "react/jsx-runtime";
var RouteContext = createContext2({
  renderedRoutes: null,
  blogNavigate: () => {
  },
  currentLocation: {}
});
var RouteProviderWithRouter = (props) => /* @__PURE__ */ jsx2(BrowserRouter, { children: /* @__PURE__ */ jsx2(RouteProvider, { ...props }) });
var RouteProvider = ({ routes, children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { checkPermission } = usePermission();
  const findRouteItemByPathName = useCallback2((targetPath) => {
    const result = routes.find(({ path }) => new RegExp(`^${path?.replace(/:\w+/g, "(\\w+)")}$`).test(targetPath));
    if (!result) {
      navigate({ pathname: "error" });
      return {};
    }
    return result;
  }, [routes, navigate]);
  const blogNavigate = useCallback2(({ pathname: pathname2, ...restPathFields }) => {
    const targetRouteItem = findRouteItemByPathName(pathname2);
    const { permissionRequire } = targetRouteItem;
    const { status } = checkPermission(permissionRequire || []);
    if (status) navigate({ pathname: pathname2, ...restPathFields });
    else navigate({ pathname: "error" });
  }, [routes, findRouteItemByPathName, navigate]);
  const currentLocation = useMemo2(() => findRouteItemByPathName(pathname) || {}, [pathname, findRouteItemByPathName]);
  const renderedRoutes = useMemo2(() => /* @__PURE__ */ jsx2(Routes, { children: routes.map((route, index) => /* @__PURE__ */ jsx2(Route, { errorElement: /* @__PURE__ */ jsx2(Navigate, { to: { pathname: "/error" } }), ...route }, index)) }), [routes]);
  return /* @__PURE__ */ jsx2(RouteContext.Provider, { value: { renderedRoutes, blogNavigate, currentLocation }, children });
};
var useRoute = () => useContext2(RouteContext);
export {
  GlobalProvider,
  RouteProviderWithRouter,
  useGlobal,
  useHelmet,
  useHttp,
  usePermission,
  useRoute
};
