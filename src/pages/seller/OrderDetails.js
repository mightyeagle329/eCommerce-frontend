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
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateOrderBySeller } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const SellerOrderDetails = ({ orderDetails }) => {
  const [order, setOrder] = useState(orderDetails);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  let daysPassed =
    (new Date() - new Date(order.updatedAt)) / (1000 * 3600 * 24);

  const handleCancelOrder = () => {
    const newOrder = {
      orderStatus: "cancelled",
      orderComment: `Seller: ${cancelReason}`,
      mainOrderId: order.orderId,
    };
    updateOrderBySeller(order._id, newOrder).then((res) => {
      res.status === 200 && setOrder(res?.data);
    });
    setCancelModalOpen(false);
  };

  const handleApproveOrder = () => {
    const data = {
      orderStatus: "approved",
      mainOrderId: order.orderId,
    };
    updateOrderBySeller(order._id, data).then((res) => {
      res.status === 200 && setOrder(res?.data);
      console.log(res.data);
    });
    setApproveModalOpen(false);
  };

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
              <Stack>
                {order.orderStatus === "cancelled" ? (
                  `Cancelled : Reason (${order?.orderComment})`
                ) : order.orderStatus === "pending" ? (
                  <Stack direction="row" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setCancelModalOpen(true)}
                    >
                      Cancel Order
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setApproveModalOpen(true)}
                    >
                      Approve Order
                    </Button>
                  </Stack>
                ) : (
                  order.orderStatus !== "delivered" &&
                  order.orderStatus !== "cancelled" && (
                    <Typography>
                      Now that your have already approved this order.
                      Cancellation is currently not available.
                    </Typography>
                  )
                )}
              </Stack>
            </Stack>
            <Typography variant="body2" sx={{ alignItems: "flex-end" }}>
              Total: <s>৳{order.totalMarketPrice}</s>
              <b>৳{order.totalAmount}</b>
            </Typography>
          </Stack>

          <Paper elevation={1} sx={{ mt: 5, mb: 5, p: 2 }}>
            {order.products.map(
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
                          : "No warranty available (7 days passed)"}
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
                    {order.orderStatus.toUpperCase()}
                  </Stack>
                </Stack>
              )
            )}
          </Paper>

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

      {/* Cancel Order Section */}
      <Dialog open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
        <DialogTitle>Please Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to cancel this order. Please tell us the reason why
            you are doing so.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="cancelReason"
            label="Cancel Reason"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setCancelModalOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={cancelReason === ""}
            variant="contained"
            onClick={handleCancelOrder}
          >
            Proceed Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approve Order Section */}
      <Dialog
        open={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
      >
        <DialogTitle>Please Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to approve this order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setApproveModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApproveOrder}>
            Proceed Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default SellerOrderDetails;
