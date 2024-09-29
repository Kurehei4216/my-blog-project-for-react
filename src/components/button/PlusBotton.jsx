import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, useTheme, Typography } from "@mui/material";
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
      <Typography
        variant="button" // ここでフォントスタイルを指定
        style={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          width: "92px",
          display: "flex",
          padding: "5px",
          borderRadius: "8px 8px 8px 8px ",
        }}
      >
        新規作成
        <AddIcon
          style={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        />
      </Typography>
    </IconButton>
  );
};

export default AddPostButton;
