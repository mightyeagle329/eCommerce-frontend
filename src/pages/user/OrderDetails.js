import { Inventory } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Review from "../../components/Review";

const OrderDetails = ({ orderDetails }) => {
  const [order, setOrder] = useState(orderDetails);
  const [activeStep, setActiveStep] = useState(0);
  const [reviewProduct, setReviewProduct] = useState(null);

  let daysPassed =
    (new Date() - new Date(order.updatedAt)) / (1000 * 3600 * 24);
  const steps = [
    {
      label: "Pending",
      description: `Your order is pending. One of our agent is going to approve your order as soon as possible.`,
    },
    {
      label: "Approved",
      description:
        "Our team has approved your order. Be assured that the seller is preparing your order right away.",
    },
    {
      label: "Reached Our Warehouse",
      description: `Your package has been arrived at our warehouse with tracking number BEX-BDN-${order._id} from where it will be sent to your address soon.`,
    },
    {
      label: "Out for Delivery",
      description: "Your package is currently out for delivery.",
    },
    {
      label: "Delivered",
      description: `Your package has been delivered.`,
    },
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 10 }}>
        <Container maxWidth="lg" sx={{}}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ marginTop: 2, marginBottom: 2, bgcolor: "white", p: 2 }}
          >
            <Stack direction="column">
              <Typography variant="h6">Order #{order._id}</Typography>
              <Typography variant="caption">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ alignItems: "flex-end" }}>
              Total: <b>৳{order.totalAmount}</b>
            </Typography>
          </Stack>

          {Object.entries(order.products).map(
            (
              [
                seller,
                {
                  products,
                  totalAmount,
                  totalMarketPrice,
                  orderStatus,
                  orderComment,
                },
              ],
              index
            ) => {
              return (
                <Paper key={seller} elevation={1} sx={{ mt: 5, mb: 5, p: 2 }}>
                  <Stack
                    justifyContent="space-between"
                    direction="row"
                    sx={{
                      bgcolor: "#5af",
                      color: "white",
                      alignItems: "center",
                      p: 1,
                      mb: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Inventory />{" "}
                      <Stack direction="column">
                        <Typography variant="body2">
                          Package {index + 1}
                        </Typography>
                        <Typography variant="caption">
                          Sold by:{" "}
                          <Link
                            to={`/shop/${seller}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {seller}
                          </Link>
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="column">
                      <Typography>
                        <s>৳{totalMarketPrice}</s> ৳{totalAmount}
                      </Typography>
                    </Stack>
                  </Stack>

                  {orderStatus === "cancelled" && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      We are sorry that the seller had to cancel this order for
                      reason as seller explained ({orderComment}). We are going
                      to investigate the issue. Sorry for the inconveniance.
                    </Typography>
                  )}

                  <Stepper
                    orientation="vertical"
                    activeStep={
                      orderStatus === "pending"
                        ? 0
                        : orderStatus === "approved"
                        ? 1
                        : orderStatus === "shipped"
                        ? 2
                        : orderStatus === "outForDelivery"
                        ? 3
                        : orderStatus === "delivered" && 4
                    }
                    sx={{ m: 5 }}
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                          <Typography>{step.description}</Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>

                  {products.map(
                    ({
                      productId,
                      title,
                      img,
                      quantity,
                      price,
                      seller,
                      marketPrice,
                      hasMerchantReturnPolicy,
                    }) => (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          flexDirection: { xs: "column", sm: "row" },
                          bgcolor: "white",
                        }}
                        key={productId}
                      >
                        <Stack direction="row" sx={{ gap: 2, w: "60%" }}>
                          <Avatar
                            src={img}
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 0,
                              mr: 1,
                            }}
                          />
                          <Stack direction="column">
                            <Link
                              to={`/product/${productId}`}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <Typography
                                sx={{
                                  width: 300,
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  fontWeight: 400,
                                }}
                              >
                                {title}
                              </Typography>
                            </Link>
                            <Typography>
                              {hasMerchantReturnPolicy && daysPassed <= 7
                                ? "Return available"
                                : "No warranty available"}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Typography variant="caption" sx={{ w: "20%" }}>
                          <s>৳{marketPrice}</s> ৳{price}
                        </Typography>
                        <Typography variant="caption" sx={{ w: "20%" }}>
                          Qty: {quantity}
                        </Typography>
                        <Stack direction="column" sx={{ w: "20%" }}>
                          {orderStatus === "delivered" ? (
                            <Button
                              variant="text"
                              onClick={() =>
                                setReviewProduct({ productId, title, img, seller })
                              }
                            >
                              Give Review
                            </Button>
                          ) : (
                            orderStatus.toUpperCase()
                          )}
                        </Stack>
                      </Stack>
                    )
                  )}
                </Paper>
              );
            }
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexDirection: { xs: "column", sm: "row", gap: 2 } }}
          >
            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Shipping Information
              </Typography>
              <Typography variant="subtitle2">
                Name: {order.shippingInfo.fullName}
              </Typography>
              <Typography variant="subtitle2">
                Phone Number: {order.shippingInfo.phoneNumber}
              </Typography>
              <Typography variant="subtitle2">
                Division: {order.shippingInfo.division}
              </Typography>
              <Typography variant="subtitle2">
                District: {order.shippingInfo.district}
              </Typography>
              <Typography variant="subtitle2">
                Upazila: {order.shippingInfo.upazila}
              </Typography>
              <Typography variant="subtitle2">
                Street: {order.shippingInfo.street}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Billing Information
              </Typography>
              <Typography variant="subtitle2">
                Name: {order.billingInfo.fullName}
              </Typography>
              <Typography variant="subtitle2">
                Phone Number: {order.billingInfo.phoneNumber}
              </Typography>
              <Typography variant="subtitle2">
                Division: {order.billingInfo.division}
              </Typography>
              <Typography variant="subtitle2">
                District: {order.billingInfo.district}
              </Typography>
              <Typography variant="subtitle2">
                Upazila: {order.billingInfo.upazila}
              </Typography>
              <Typography variant="subtitle2">
                Street: {order.billingInfo.street}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              <Typography variant="subtitle2">
                Sub Total: ৳ {order.totalAmount}
              </Typography>
              <Typography variant="subtitle2">
                Delivery Charge: ৳ <s>50</s> free
              </Typography>
              <Typography variant="subtitle2">
                Total: ৳ {order.totalAmount}
              </Typography>
              <Typography variant="subtitle2">
                Payment Method: Cash on delivery
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Container>

      {/* Review Section */}
      <Dialog
        open={reviewProduct !== null}
        onClose={() => setReviewProduct(null)}
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Review
            productId={reviewProduct?.productId}
            img={reviewProduct?.img}
            title={reviewProduct?.title}
            seller={reviewProduct?.seller}
            from="order"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewProduct(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default OrderDetails;
