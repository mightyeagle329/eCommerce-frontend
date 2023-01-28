import { Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Paper,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderDetails from "../user/OrderDetails";
import { getOrders } from "../../redux/apiCalls";

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    getOrders(user._id).then((res) => setOrders(res));
  }, [user._id]);

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  console.log(orders);
  const columns = [
    {
      field: "createdAt",
      headerName: "Placed On",
      headerClassName: "super-app-theme--header",
      width: 275,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Typography>
              {new Date(params.row.createdAt).toLocaleString()}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "_id",
      headerName: "Order Id",
      headerClassName: "super-app-theme--header",
      width: 250,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => {
        return (
          <Stack sx={{ alignItems: "center" }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setShowDetails(true);
                setOrderDetails(params.row);
              }}
              underline="hover"
            >
              Manage
            </Link>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      {showDetails ? (
        <Dialog
          fullScreen
          open={showDetails}
          onClose={() => {
            setShowDetails(false);
            setOrderDetails([]);
          }}
          TransitionComponent={SlideTransition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setShowDetails(false);
                  setOrderDetails([]);
                }}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Order Details
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <OrderDetails orderDetails={orderDetails} />
          </DialogContent>
        </Dialog>
      ) : (
        <Container maxWidth="xl" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="h6">Order History</Typography>
          <Container>
            {orders.length === 0 ? (
              <Typography>You have no orders.</Typography>
            ) : (
              <>
                <Typography>
                  You have made total {orders.length}{" "}
                  {orders.length === 1 ? "order" : "orders"} with us. Thanks for
                  staying with us.
                </Typography>
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
                    rows={orders}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    density="comfortable"
                    initialState={{
                      sorting: {
                        sortModel: [{ field: "createdAt", sort: "desc" }],
                      },
                    }}
                  />
                </Box>
              </>
            )}
            {/* {orders.map((order) => (
              <Paper key={order._id} elevation={1} sx={{ p: 1, m: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ marginTop: 2 }}
                >
                  <Stack direction="column" flex={4}>
                    <Typography variant="h6">
                      Order{" "}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          setShowDetails(true);
                          setOrderDetails(order);
                        }}
                        underline="hover"
                      >
                        #{order._id}
                      </Link>
                    </Typography>
                    <Typography variant="caption">
                      Placed on {new Date(order.createdAt).toLocaleString()} |
                      Status: <b>{order.orderStatus.toUpperCase()}</b>
                    </Typography>
                  </Stack>
                  <Stack sx={{ flex: 1, alignItems: "flex-end" }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        setShowDetails(true);
                        setOrderDetails(order);
                      }}
                      underline="hover"
                    >
                      Manage
                    </Link>
                  </Stack>
                </Stack>
              </Paper>
            ))} */}
          </Container>
        </Container>
      )}
    </>
  );
};

export default Orders;
