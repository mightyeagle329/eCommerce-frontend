import { ThemeProvider } from "@emotion/react";
import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { forgotPass, resetPass } from "../../redux/apiCalls";

const theme = createTheme();
const ForgotPass = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [response, setResponse] = useState();
  const { token, userId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    email &&
      forgotPass(email.toLocaleLowerCase()).then((res) => {
        setResponse({ result: "success", message: res.data });
        setLoading(false);
      });
    password &&
      resetPass(password, userId, token).then((res) => {
        setResponse({ result: "success", message: res.data });
        setLoading(false);
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            {!token && !userId && (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                  variant="standard"
                />

                {email.length > 0 &&
                  !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                    <div style={{ color: "red", fontSize: "10px" }}>
                      ☹ Invalid email address!
                    </div>
                  )}
                <Button
                  disabled={
                    (email.length > 0 &&
                      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) ||
                    loading
                  }
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? "Please wait.." : "Submit"}
                </Button>
              </Box>
            )}
            {token && userId && (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Password2"
                  type="password2"
                  id="password2"
                  autoComplete="current-password2"
                  variant="standard"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {password !== password2 && (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    ☹ Passwords doesn't match!
                  </span>
                )}
                {(password.length < 4 || password2.length < 4) && (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    ✯ Password must be at least 4 characters long!
                  </span>
                )}

                <Button
                  disabled={
                    password !== password2 ||
                    password.length < 4 ||
                    password2.length < 4 ||
                    loading
                  }
                >
                  {loading ? "Please wait.." : "Submit"}
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>

      {/* Display login success message or error */}
      <Snackbar
        open={Boolean(response)}
        autoHideDuration={4000}
        onClose={() => setResponse(false)}
      >
        <Alert
          onClose={() => setResponse(false)}
          severity={response?.result || "error"}
          sx={{ width: "100%" }}
        >
          {response?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPass;
