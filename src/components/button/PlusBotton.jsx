import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddPostButton = (props) => {
  const { redirectPath, style } = props;
  const theme = useTheme();
  const history = useNavigate();
  const handleClick = () => {
    // ボタンがクリックされたときの処理を記述する
    history(redirectPath);
  };

  return (
    <IconButton
      onClick={handleClick}
      color="primary"
      aria-label="add post"
      style={style}
    >
      <AddIcon
        style={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          borderRadius: "50%",
          width: "64px",
          height: "64px",
        }}
      />
    </IconButton>
  );
};

export default AddPostButton;
