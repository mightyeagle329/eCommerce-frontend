import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  Slide,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Product from "./ProductComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  getProductsAsCategory,
  getSellerProducts,
} from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Products = ({
  cat = false,
  shopName = false,
  sort = false,
  cartOpen = false,
  limit = 100,
}) => {
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [response, setResponse] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    cat && getProductsAsCategory(cat).then((res) => setFilteredProducts(res));
  }, [cat]);

  useEffect(() => {
    getSellerProducts(shopName).then((res) => setFilteredProducts(res));
  }, [shopName]);

  useEffect(() => {
    sort === "newest" &&
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    sort === "asc" &&
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    sort === "desc" &&
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
  }, [sort]);

  const handleAddToCart = (productInfo) => {
    !user && navigate("/login");
    user &&
      addToCart(user._id, productInfo, dispatch).then((res) =>
        setResponse(res)
      );
  };

  const handleAddToWishlist = (productInfo) => {
    !user && navigate("/login");
    user &&
      addToWishlist(user._id, productInfo).then((res) => setResponse(res));
  };

  return (
    <>
      {cat && filteredProducts.length === 0 ? (
        <Typography>No products available yet under this category.</Typography>
      ) : shopName && filteredProducts.length === 0 ? (
        <Typography>No products available yet under this shop.</Typography>
      ) : (
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          columns={{ xs: 5, sm: cartOpen ? 5 : 10, md: cartOpen ? 10 : 15 }}
        >
          {/* columns 5 = 1 product */}
          {cat || shopName
            ? filteredProducts
                .slice(0, limit)
                .map((item) => (
                  <Product
                    item={item}
                    key={item._id}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                  />
                ))
            : products
                .slice(0, limit)
                .map((item) => (
                  <Product
                    item={item}
                    key={item._id}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                  />
                ))}
        </Grid>
      )}

      {/* Display success or error message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(response)}
        TransitionComponent={SlideTransition}
        autoHideDuration={5000}
        onClose={() => {
          setResponse(false);
        }}
      >
        <Alert
          onClose={() => {
            setResponse(false);
          }}
          severity={response.result}
          sx={{ width: "100%" }}
        >
          {response.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Products;
