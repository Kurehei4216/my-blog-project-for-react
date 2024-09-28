// BreadcrumbNavigation.jsx
import React from "react";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BreadcrumbNavigation = () => {
  const { breadcrumbs, removeBreadcrumb } = useBreadcrumbs();
  const navigate = useNavigate();

  const StyledLink = styled(Link)({
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
  });

  const handleRemoveClick = (index) => removeBreadcrumb(index);

  const toPage=(breadcrumb)=>{
    navigate(breadcrumb.url);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <StyledLink
          key={index}
          onClick={() => {
            toPage(breadcrumb);
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
