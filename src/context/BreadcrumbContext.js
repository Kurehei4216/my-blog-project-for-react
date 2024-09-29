import React, { createContext, useContext, useState, useCallback } from "react";

const BreadcrumbContext = createContext();

export const useBreadcrumbs = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: "Home", url: "/" }]);
  const addBreadcrumb = useCallback((breadcrumb) => {
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, breadcrumb]);
  }, []);

  const removeBreadcrumb = (index) => {
    setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, index + 1));
  };

  return (
    <BreadcrumbContext.Provider
      value={{ breadcrumbs, addBreadcrumb, removeBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
