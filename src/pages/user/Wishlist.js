import {
  DeleteForeverOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteWishlist,
  getWishlistProducts,
} from "../../redux/apiCalls";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Tabs,
  Tab,
  Paper,
  Slide,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Wishlist = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const [value, setValue] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  //Display added to cart message
  const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  //Empty Cart Prompt
  const [openEmptyWishlistDialog, setOpenEmptyWishlistDialog] = useState(false);

  const handleEmptyWishlist = () => {
    deleteWishlist(id);
    setWishlistProducts([]);
    setOpenEmptyWishlistDialog(false);
    setValue(0);
  };

  const handleCloseDialog = () => {
    setOpenEmptyWishlistDialog(false);
    setValue(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = (item) => {
    const productInfo = {
      productId: item._id,
      title: item.title,
      img: item.img,
      quantity: 1,
      price: item.price,
      marketPrice: item.marketPrice,
      seller: item.seller,
      hasMerchantReturnPolicy: item.hasMerchantReturnPolicy,
    };
    !id && Navigate("/login");
    id &&
      addToCart(id, productInfo, dispatch).then(() => {
        setAddedToCartMsg(true);
      });
  };

  useEffect(() => {
    getWishlistProducts(id).then(
      (res) => res && setWishlistProducts(res.products)
    );
  }, [id]);

  const columns = [
    { field: "productId", hide: true },
    { field: "img", hide: true },
    { field: "marketPrice", hide: true },
    { field: "seller", hide: true },
    { field: "hasMerchantReturnPolicy", hide: true },

    {
      field: "title",
      headerName: "Product",
      headerClassName: "super-app-theme--header",
      width: 300,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.img} alt="" />
            <Typography>{params.row.title}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 330,
      renderCell: (params) => {
        return (
          <Stack direction="row" sx={{ gap: 1 }}>
            <Link
              to={`/product/${params.row.productId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="outlined">
                <Typography>View Details</Typography>
              </Button>
            </Link>
            <Button
              variant="outlined"
              onClick={() => handleAddToCart(params.row)}
            >
              <Typography>Add to Cart</Typography>
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      {/* Display Prompt */}
      <Dialog
        open={Boolean(openEmptyWishlistDialog)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete all products from wishlist?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed your wishlist will be erased. This action is non
            reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEmptyWishlist}>Proceed</Button>
        </DialogActions>
      </Dialog>

      {/* Display Added To Cart Message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={addedToCartMsg}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        onClose={() => setAddedToCartMsg(false)}
        message="Added To Cart"
      />

      <Typography variant="h6">Your Wishlist</Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ margin: 2 }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
          centered
          sx={{ width: { xs: 300, sm: "100%" } }}
        >
          <Tab
            icon={<FavoriteBorderOutlined />}
            label={
              wishlistProducts.length === 0
                ? "Wishlist"
                : `Wishlist (${wishlistProducts.length})`
            }
          />
          <Tab
            icon={<DeleteForeverOutlined />}
            label="Empty Wishlist"
            onClick={() => setOpenEmptyWishlistDialog(true)}
          />
        </Tabs>

        {wishlistProducts.length === 0 ? (
          <Typography sx={{ textAlign: "center", marginTop: 5 }}>
            THERE ARE NO PRODUCT AVAILABLE IN YOUR WISHLIST.
          </Typography>
        ) : (
          <Box
            sx={{
              height: 500,
              width: "780px",
              ml: "auto",
              mr: "auto",
              "& .super-app-theme--header": {
                backgroundColor: "#2263a5",
                borderLeftWidth: 1,
                borderColor: "#f1f8ff",
                color: "white",
              },
            }}
          >
            <DataGrid
              rows={wishlistProducts}
              getRowId={(row) => row.productId}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              density="comfortable"
              initialState={{
                sorting: {
                  sortModel: [{ field: "title", sort: "desc" }],
                },
              }}
            />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default Wishlist;
