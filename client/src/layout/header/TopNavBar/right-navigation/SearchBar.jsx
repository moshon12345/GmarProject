import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import {useTheme} from "../../../../providers/ThemePrvoider"
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../routes/routesModel";

let inputText = "";

const SearchBar = ({
  data
}) => {

  const [broadCastSearchInput, setBroadCastSearchInput] = useState("")
  const navigate = useNavigate();
  const { isDark } = useTheme();
  return (
    <Box display="inline-flex">
      <FormControl variant="standard">
        <OutlinedInput
          onChange={e => {
            navigate(`${ROUTES.MOVIES}/${e.target.value}`)
          }}
          sx={{ backgroundColor: isDark ? "#333333" : "#e3f2fd" }}
          placeholder="Search"
          size="small"
          endAdornment={
            <InputAdornment
             position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
