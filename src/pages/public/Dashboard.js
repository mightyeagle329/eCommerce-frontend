import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../../components/Navbar";
import Home from "./Home";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../redux/apiCalls";
import Checkout from "../user/Checkout";
import Profile from "../user/Profile";
import Orders from "../user/Orders";
import {
  alpha,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Fab,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import {
  Cancel,
  ChevronLeft,
  ChevronRight,
  LocalFlorist,
  Logout,
  ShoppingBag,
} from "@mui/icons-material";
import ProductList from "./ProductList";
import Login from "./Login";
import Register from "./Register";
import RegisterSeller from "./RegisterSeller";
import { useSelector } from "react-redux";
import Wishlist from "../user/Wishlist";
import Shop from "./Shop";
import NotFoundPage from "./NotFoundPage";
import Product from "./Product";
import ProductSearch from "./ProductSearch";
import Footer from "../../components/Footer";
import Cart from "../user/Cart";

const drawerWidth = 200;
const cartDrawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Dashboard() {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
  const cart = useSelector((state) => state.cart);

  const [cartOpen, setCartOpen] = useState(false);

  const [nowShowing, setNowShowing] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
    setCartOpen(false);
  };

  const user = useSelector((state) => state.user.currentUser) || "";

  const screen = useParams().screen;
  const shopName = useParams().shopName;
  const categoryName = useParams().categoryName;
  const productId = useParams().productId;

  //Control which screen is displaying
  useEffect(() => {
    !screen
      ? setNowShowing("")
      : (screen === "login" ||
          screen === "register" ||
          screen === "sell-online") &&
        user !== ""
      ? navigate("/")
      : setNowShowing(screen[0].toUpperCase() + screen.slice(1));
  }, [navigate, screen, user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // #209CEE
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
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
              {(user?.accountType === 0) | !user ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleMenuClick}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                ""
              )}
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
            {(user?.accountType === 0 || !user) && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Search>
            )}

            {user === "" && (
              <Stack direction="column" justifyContent="space-between">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Typography variant="overline">Login</Typography>
                </Link>
              </Stack>
            )}

            {user?.accountType === 0 && (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  width: 30,
                  height: 30,
                }}
              >
                <Avatar
                  alt="pic"
                  sx={{
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  src={user.img}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  onMouseOver={handleClick}
                />
              </StyledBadge>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              display: { xs: "none", md: !open ? "none" : "block" },
            },
          }}
          variant="permanent"
          anchor="left"
          open={open && isBigScreen}
        >
          <Toolbar />
          <Navbar />
        </Drawer>
        <Drawer
          anchor="left"
          open={open && !isBigScreen}
          onClose={() => setOpen(false)}
        >
          <Toolbar />
          <Navbar />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {query !== "" ? (
            <ProductSearch
              query={query.toLowerCase().split(" ").join("-")}
              cartOpen={cartOpen}
            />
          ) : shopName ? (
            <Shop cartOpen={cartOpen} />
          ) : categoryName ? (
            <ProductList cartOpen={cartOpen} />
          ) : productId ? (
            <Product />
          ) : nowShowing === "" ? (
            <Home cartOpen={cartOpen} />
          ) : nowShowing === "Checkout" ? (
            <Checkout />
          ) : nowShowing === "Wishlist" ? (
            <Wishlist />
          ) : nowShowing === "Profile" ? (
            <Profile cartOpen={cartOpen} />
          ) : nowShowing === "Orders" ? (
            <Orders />
          ) : nowShowing === "Login" ? (
            <Login />
          ) : nowShowing === "Register" ? (
            <Register />
          ) : nowShowing === "Sell-online" ? (
            <RegisterSeller />
          ) : (
            <NotFoundPage />
          )}

          <Footer />
        </Main>
      </Box>

      {/* Menu on click profile picture */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          onMouseLeave: handleClose,
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ pointer: "grab" }}
      >
        <MenuItem>
          <Link
            to="/profile/"
            style={{
              textDecoration: "none",
            }}
          >
            Your Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/orders/"
            style={{
              textDecoration: "none",
            }}
          >
            Your Orders
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/wishlist"
            style={{
              textDecoration: "none",
            }}
          >
            Your Wishlist
          </Link>
        </MenuItem>
        <Divider />
        <Button
          variant="text"
          sx={{ display: "flex", color: "red" }}
          onClick={() => logout()}
        >
          <Logout />
          Logout
        </Button>
      </Menu>

      {/* Pc or tab users cart */}
      {!cartOpen && (user.accountType === 0 || !user) && (
        <Fab
          color="primary"
          aria-label="cart"
          variant="extended"
          sx={{
            display: { xs: "none", md: "block" },
            position: "fixed",
            bottom: "50%",
            right: 0,
            height: 85,
            bgcolor: "transparent",
            color: "blue",
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
              bgcolor: "transparent",
              height: 90,
              transition: "height 0.5s ease",
            },
          }}
          onClick={() => {
            setCartOpen(true);
            setOpen(false);
          }}
        >
          <Stack alignItems="center" justifyContent="center">
            <ShoppingBag fontSize="large" />
            <Typography>{cart.products.length} Items</Typography>
            <Divider sx={{ width: "100%" }} />
            <Typography>৳ {cart.total}</Typography>
          </Stack>
        </Fab>
      )}

      {/* mobile users cart */}
      {!cartOpen && (user.accountType === 0 || !user) && (
        <Paper
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "transparent",
            color: "blue",
          }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label={`${cart.products.length} Items`}
              icon={<ShoppingBag color="primary" />}
              onClick={() => {
                setCartOpen(true);
                setOpen(false);
              }}
            />
          </BottomNavigation>
        </Paper>
      )}

      {/* Cart can only be accessible by customer */}
      {cartOpen && (user.accountType === 0 || !user) && (
        <Drawer
          sx={{
            width: cartDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: cartDrawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar />
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="overline"
              sx={{
                display: "flex",
                flexDirection: "center",
                alignItems: "center",
                fontWeight: 700,
                fontSize: 18,
                gap: 1,
                fontFamily: "Brush Script MT, cursive",
                letterSpacing: ".2rem",
              }}
            >
              <ShoppingBag fontSize="large" /> {cart.products.length} Items
            </Typography>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setCartOpen(false);
              }}
            >
              <Cancel />
            </Button>
          </Stack>
          <Cart />
        </Drawer>
      )}
    </>
  );
}
