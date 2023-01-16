import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, Button, Divider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LinksAndNewsletter() {
  const user = useSelector((state) => state.user.currentUser) || "";
  return (
    <Stack
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        color: "black",
        padding: 1,
        flex: 3,
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      <Stack flex={1}>
        <Stack>
          <Typography variant="h5">About Us</Typography>
          <Link
            variant="body2"
            to="/#about1"
            style={{ textDecoration: "none" }}
          >
            Read our blog
          </Link>
          <Link
            variant="body2"
            to="/#about3"
            style={{ textDecoration: "none" }}
          >
            FAQ
          </Link>
          <Link
            variant="body2"
            to="/#about4"
            style={{ textDecoration: "none" }}
          >
            Join us!
          </Link>
        </Stack>
        <Stack>
          <Typography variant="h5">Earn With Bettermart</Typography>
          <Link
            variant="body2"
            to="/#about1"
            style={{ textDecoration: "none" }}
          >
            Sell on Daraz
          </Link>
          <Link
            variant="body2"
            to="/#about1"
            style={{ textDecoration: "none" }}
          >
            Code of Conduct
          </Link>
          <Link
            variant="body2"
            to="/#about1"
            style={{ textDecoration: "none" }}
          >
            Join the Daraz Affiliate Program
          </Link>
        </Stack>
      </Stack>
      <Stack flex={1}>
        <Stack>
          <Typography variant="h5">Customer Care</Typography>
          <Link variant="body2" to="/#help1" style={{ textDecoration: "none" }}>
            Return policy
          </Link>
          <Link variant="body2" to="/#help2" style={{ textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link variant="body2" to="/#help3" style={{ textDecoration: "none" }}>
            Terms and conditions
          </Link>
          <Link variant="body2" to="/#help4" style={{ textDecoration: "none" }}>
            Submit complaint
          </Link>
        </Stack>
        <Stack>
          <Typography variant="h5">Follow</Typography>
          <Link variant="body2" to="/#help1" style={{ textDecoration: "none" }}>
            Instagram
          </Link>
          <Link variant="body2" to="/#help1" style={{ textDecoration: "none" }}>
            Facebook
          </Link>
          <Link variant="body2" to="/#help1" style={{ textDecoration: "none" }}>
            Newsletter
          </Link>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        {user === "" && (
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Sign Up For 20% Off Your First Order
          </Typography>
        )}
        <Typography
          sx={{
            fontWeight: 300,
            mb: "20px",
            textAlign: { md: "center" },
          }}
        >
          Hear Updates (Get updates for offers, promo codes directly in your
          inbox.)
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <input
            placeholder="Your email"
            style={{
              backgroudColor: "lightblue",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "center",
              height: 40,
              outline: "none",
            }}
          />
          <Button variant="contained" sx={{ width: 100, ml: 1, height: 30 }}>
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ textAlign: "center" }}
    >
      {"Copyright © "}
      <Link to="/" sx={{ fontSize: "large", textDecoration: "none" }}>
        Bestmart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Divider variant="middle">
        <Button onClick={() => window.scrollTo(0, 0)}>Back to top</Button>
      </Divider>

      <Box
        sx={{
          backgroundColor: "#55c9ff",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            mb: 0,
          }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              variant="square"
              src="https://i.ibb.co/JkXmd1c/android-chrome-512x512.png"
              sx={{ width: 24, height: 24 }}
            />
            <b>Bestmart</b>
          </Stack>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", width: "70%" }}
          >
            Bestmart is an online shop available in Dhaka, Chattogram, Jashore,
            Khulna, Sylhet, Gazipur, Rajshahi and Narayanganj. We believe time
            is valuable to our fellow residents, and that they should not have
            to waste hours in traffic, brave bad weather and wait in line just
            to buy basic necessities like eggs! This is why Bestmart delivers
            everything you need right at your door-step and at no additional
            cost.
          </Typography>
        </Stack>
        <Divider variant="middle" />
        <Box
          component="footer"
          sx={{
            mt: "auto",
            ml: 5,
            mr: 5,
          }}
        >
          <LinksAndNewsletter />
          <Container maxWidth="xl" sx={{ pb: { sm: 20, md: 0 } }}>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </>
  );
}
