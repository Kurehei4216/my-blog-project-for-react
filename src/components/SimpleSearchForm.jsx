import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

const SimpleSearchForm = ({ onSearch, getDateFormatByFormat }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      await axios
        .get(`http://localhost:3000/api/v1/admin/posts/search`, {
          params: {
            keyword: searchTerm,
          },
        })
        .then((data) => {
          const resultPosts = data.data.map((value) => {
            return {
              id: value.id,
              name: value.title,
              is_publish: value.is_publish,
              updated_at: getDateFormatByFormat(value.updated_at, "YYYY-MM-DD"),
              carbs: 67,
              protein: 4.3,
            };
          });
          onSearch(resultPosts);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        marginLeft: "15px",
        display: "flex",
        gap: 1,
        marginBottom: 1,
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <TextField
        label="検索"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        sx={{
          width: "400px",
          "& .MuiOutlinedInput-root": {
            height: "40px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SimpleSearchForm;
