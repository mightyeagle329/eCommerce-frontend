import styled from "@emotion/styled";
import { ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { getCats } from "../redux/apiCalls";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100vw",
    padding: 20,
    fontSize: 15,
    mr: 20,
  },
}));

const Navbar = () => {
  const [catList, setCatList] = useState([]);

  // get categories from api
  useEffect(() => {
    getCats().then((res) => {
      setCatList(res.data);
    });
  }, []);

  return (
    <Box>
      <Typography sx={{ pl: 5, fontSize: 15 }}>Categories</Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack
        sx={{
          paddingLeft: 2,
          gap: 1,
          cursor: "grab",
        }}
      >
        {catList.map((cat) => (
          <Link
            key={cat._id}
            to={"/products/" + cat.value}
            style={{
              textDecoration: "none",
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 1,
                alignItems: "center",
              }}
            >
              <Avatar src={cat.img} sx={{ width: 25, height: 25 }} alt="img" />
              <Typography
                sx={{
                  fontSize: 10,
                }}
              >
                {cat.label}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default Navbar;
