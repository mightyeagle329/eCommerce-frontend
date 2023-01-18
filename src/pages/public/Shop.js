import {
  AppBar,
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getSellerDetails,
  getSellerProducts,
  updateShopFollowers,
} from "../../redux/apiCalls";
import Product from "../../components/ProductComponent";
import { Add, ArrowCircleRight } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/apiCalls";
import Products from "../../components/Products";

const Shop = ({ cartOpen = false, providedShopName = false }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const shopName = providedShopName || location.pathname.split("/")[2];
  const [seller, setSeller] = useState();

  useEffect(() => {
    getSellerDetails(shopName).then((res) => setSeller(res));
  }, [shopName]);
  const handleFollow = () => {
    let followedStores = [...user.followedStores];
    //check if shop Name exists
    let itemIndex = followedStores.findIndex((s) => s === seller.username);
    if (itemIndex > -1) {
      //shop Name exists in the followedStores, remove it
      followedStores.splice(itemIndex, 1);
    } else {
      //shop Name does not exists in followedStores, add new
      followedStores.push(seller.username);
    }
    const updatedUser = {
      ...user,
      followedStores: followedStores,
    };

    updateUser(user._id, updatedUser, dispatch);
    updateShopFollowers(seller._id);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {!providedShopName ? (
        <Box sx={{ position: "relative", textAlign: "left" }}>
          <Avatar
            src={seller?.img}
            sx={{ borderRadius: 0, width: "100%", height: 200 }}
          />
          <Typography
            variant="h3"
            sx={{
              position: "absolute",
              bottom: 0,
              background:
                "rgba(0, 0, 0, 0.5)" /* Black background with 0.5 opacity */,
              color: "#f1f1f1" /* Grey text */,
              width: "100%",
            }}
          >
            {seller?.username}
          </Typography>
        </Box>
      ) : (
        <AppBar position="static">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 1, backgroundColor: "#67bcf3" }}
          >
            <Typography>{providedShopName}</Typography>{" "}
            <Stack direction="row" alignItems="center" gap={1}>
              <ArrowCircleRight />
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/shop/${providedShopName}`}
              >
                View All
              </Link>
            </Stack>
          </Stack>
        </AppBar>
      )}
      {user?.accountType === 0 && !providedShopName && (
        <Button variant="outlined" startIcon={<Add />} onClick={handleFollow}>
          {user?.followedStores.includes(seller?.username)
            ? "Unfollow Shop"
            : "Follow Shop"}
        </Button>
      )}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ bgcolor: "whitesmoke" }}
      >
        <Products
          cartOpen={cartOpen}
          shopName={shopName}
          limit={providedShopName ? 3 : 100}
        />
      </Stack>
    </Container>
  );
};

export default Shop;
