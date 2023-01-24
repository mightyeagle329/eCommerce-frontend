import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Container,
  CssBaseline,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { Box } from "@mui/system";
import { logout } from "../redux/apiCalls";
import { Logout } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const ToBeSeller = () => {
  const user = useSelector((state) => state.user.currentUser) || "";
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar
            variant="dense"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ gap: { xs: 0, sm: 1 } }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{}}>
                  𝙱𝚎𝚜𝚝𝚖𝚊𝚛𝚝
                </Typography>
              </Link>
            </Stack>
            <Button
              variant="text"
              sx={{ display: "flex", color: "red" }}
              onClick={() => logout()}
            >
              <Logout />
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Typography variant="h3" sx={{ color: "red" }}>
            Notice!
          </Typography>
          <Typography>
            You are waiting for approval to be seller.{" "}
            {user.phoneNumber && (
              <p>
                One of our representative will contact you soon to this{" "}
                <u>{user.phoneNumber}</u> number.
              </p>
            )}
            <br /> In the meantime you might want to make some changes to your{" "}
            <Link to="/profile" style={{ textDecoration: "none" }}>
              profile
            </Link>
            .
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default ToBeSeller;
