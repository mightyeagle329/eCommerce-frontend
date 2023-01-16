import {
  Inventory2,
  DashboardSharp,
  ShoppingCart,
  AddBox,
  Person,
  Edit,
  Logout,
  Reviews,
  QuestionAnswer,
  Preview,
} from "@mui/icons-material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { forwardRef, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";
import ViewProfile from "../../components/ViewProfile";
import SellerOrders from "./Orders";
import SellerProductList from "./ProductList";
import EditProfile from "../../components/EditProfile";
import AddressBook from "../../components/AddressBook";
import AddProduct from "../../components/AddProduct";
import { logout } from "../../redux/apiCalls";
import SellerHome from "./Home";
import { useTheme } from "@emotion/react";
import SellerReviews from "./Reviews";
import SellerQuestions from "./Questions";
import { useSelector } from "react-redux";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});

export default function SellerDashboard() {
  const theme = useTheme();
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addressBookOpen, setAddressBookOpen] = useState(false);
  const navigate = useNavigate();
  const [nowShowing, setNowShowing] = useState("");
  const [open, setOpen] = useState(false);
  const url = useLocation().pathname;
  const user = useSelector((state) => state.user.currentUser);

  //Control which screen is displaying
  useEffect(() => {
    url === "/"
      ? setNowShowing("")
      : setNowShowing(url[8].toUpperCase() + url.slice(9));
  }, [url]);

  //Control drawer open or close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ zIndex: 999, backgroundColor: "#209CEE" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {nowShowing === "" ? "Dashboard" : nowShowing}
            </Typography>

            {nowShowing === "" && (
              <Stack direction="row" alignItems="center" gap={0.1}>
                <Typography
                  variant="button"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Welcome Seller
                </Typography>
                <Notification />
                <Link
                  to={`/shop/${user.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <Tooltip title="Have a look">
                    <IconButton>
                      <Preview fontSize="small" sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </Link>
                <IconButton onClick={() => logout()}>
                  <Tooltip title="Logout">
                    <Logout fontSize="small" sx={{ color: "white" }} />
                  </Tooltip>
                </IconButton>{" "}
              </Stack>
            )}

            {nowShowing === "Products" && (
              <Button
                variant="contained"
                startIcon={<AddBox />}
                onClick={() => setAddProductOpen(true)}
              >
                Add New
              </Button>
            )}
            {nowShowing === "Profile" && (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setEditProfileOpen(true)}
              >
                Edit Profile
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton
              onClick={() => navigate("/")}
              selected={nowShowing === ""}
            >
              <ListItemIcon>
                <DashboardSharp />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              onClick={() => navigate("/seller/profile")}
              selected={nowShowing === "Profile"}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/seller/products")}
              selected={nowShowing === "Products"}
            >
              <ListItemIcon>
                <Inventory2 />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/seller/orders")}
              selected={nowShowing === "Orders"}
            >
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/seller/reviews")}
              selected={nowShowing === "Reviews"}
            >
              <ListItemIcon>
                <Reviews />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("/seller/questions")}
              selected={nowShowing === "Questions"}
            >
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            width: "100%",
          }}
        >
          <Toolbar />
          {nowShowing === "" ? (
            <SellerHome />
          ) : nowShowing === "Products" ? (
            <SellerProductList />
          ) : nowShowing === "Orders" ? (
            <SellerOrders />
          ) : nowShowing === "Profile" ? (
            <Box sx={{ mt: 2 }}>
              <ViewProfile />
            </Box>
          ) : nowShowing === "Reviews" ? (
            <SellerReviews />
          ) : nowShowing === "Questions" ? (
            <SellerQuestions />
          ) : (
            <Container>
              <Typography sx={{ mt: 10 }} variant="h6">
                The page{" "}
                <span style={{ color: "red", textDecoration: "underline" }}>
                  {nowShowing.toLowerCase()}
                </span>{" "}
                you are trying to access is not available yet... maybe there is
                some misspelling...
              </Typography>
            </Container>
          )}
        </Box>
      </Box>

      <Dialog
        TransitionComponent={Transition}
        open={addProductOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setAddProductOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Add New Product
        </DialogTitle>
        <DialogContent>
          <AddProduct />
        </DialogContent>
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        open={editProfileOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setEditProfileOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <EditProfile />
        </DialogContent>
      </Dialog>

      <Dialog
        TransitionComponent={Transition}
        open={addressBookOpen}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setAddressBookOpen(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Address Book
        </DialogTitle>
        <DialogContent>
          <AddressBook />
        </DialogContent>
      </Dialog>
    </>
  );
}
