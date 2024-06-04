// BreadcrumbNavigation.jsx
import React from "react";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const BreadcrumbNavigation = () => {
  const { breadcrumbs, removeBreadcrumb } = useBreadcrumbs();

  const StyledLink = styled(Link)({
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
  });

  const handleRemoveClick = (index) => {
    console.log("aaa");
    removeBreadcrumb(index);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <StyledLink
          key={index}
          onClick={() => {
            handleRemoveClick(index);
          }}
        >
          {breadcrumb.label}
        </StyledLink>
      ))}
      {/* <Typography color="textPrimary">
        {breadcrumbs[breadcrumbs.length - 1].label}
      </Typography> */}
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation;
