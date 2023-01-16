import { Close } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
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
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersAsSeller } from "../../redux/apiCalls";
import QuickSearchToolbar from "../../utils/QuickSearchToolbar";
import SellerOrderDetails from "./OrderDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AllOrders({ orders, columns }) {
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#2263a5",
          borderLeftWidth: 1,
          borderColor: "#f1f8ff",
          color: "white",
        },
      }}
    >
      <DataGrid
        headerHeight={30}
        loading={!orders.length}
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
        components={{ Toolbar: QuickSearchToolbar }}
      />
    </Box>
  );
}

function PendingOrders({ orders, columns }) {
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#2263a5",
          borderLeftWidth: 1,
          borderColor: "#f1f8ff",
          color: "white",
        },
      }}
    >
      <DataGrid
        filterModel={{
          items: [
            {
              columnField: "orderStatus",
              operatorValue: "equals",
              value: "pending",
            },
          ],
        }}
        headerHeight={30}
        loading={!orders.length}
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
        components={{
          Toolbar: QuickSearchToolbar,
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              There is no pending orders available.
            </Stack>
          ),
        }}
      />
    </Box>
  );
}

function ApprovedOrders({ orders, columns }) {
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#2263a5",
          borderLeftWidth: 1,
          borderColor: "#f1f8ff",
          color: "white",
        },
      }}
    >
      <DataGrid
        filterModel={{
          items: [
            {
              columnField: "orderStatus",
              operatorValue: "equals",
              value: "approved",
            },
          ],
        }}
        headerHeight={30}
        loading={!orders.length}
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
        components={{
          Toolbar: QuickSearchToolbar,
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No product is stock out yet.
            </Stack>
          ),
        }}
      />
    </Box>
  );
}

const SellerOrders = ({ from = false }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    getOrdersAsSeller().then((res) => {
      setOrders(res);
      setLoading(false);
    });
  }, []);

  const handleCloseModal = () => {
    getOrdersAsSeller().then((res) => {
      setOrders(res);
      setShowDetails(false);
      setOrderDetails([]);
    });
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Placed On",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.row.createdAt).toLocaleString()}
          </Typography>
        );
      },
    },
    {
      field: "user",
      headerName: "User",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.user.img} alt="" />
            <Typography>{params.row.user.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Typography>{params.row.shippingInfo?.phoneNumber}</Typography>;
      },
    },
    {
      field: "shippingInfo",
      headerName: "Shipping",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.shippingInfo?.upazila},{" "}
            {params.row.shippingInfo?.district},{" "}
            {params.row.shippingInfo?.division}
          </Typography>
        );
      },
    },
    {
      field: "orderStatus",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Typography
              sx={{
                color: params.row.orderStatus === "pending" ? "red" : "green",
              }}
            >
              {params.row.orderStatus.toUpperCase()}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography sx={{ color: "orangered" }}>
            ৳{params.row.totalAmount}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 130,
      headerAlign: "center",
      align: "center",
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
          onClose={() => handleCloseModal()}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => handleCloseModal()}
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
            <SellerOrderDetails orderDetails={orderDetails} />
          </DialogContent>
        </Dialog>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }} disableGutters>
          {!loading && orders.length === 0 && (
            <Typography variant="h6">
              You have not received any order yet.{" "}
            </Typography>
          )}
          {!loading && orders.length !== 0 && from && (
            <Box
              sx={{
                height: 300,
                width: "100%",
                "& .super-app-theme--header": {
                  backgroundColor: "#2263a5",
                  borderLeftWidth: 1,
                  borderColor: "#f1f8ff",
                  color: "white",
                },
              }}
            >
              <DataGrid
                headerHeight={30}
                loading={loading}
                rows={orders}
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[3]}
                disableSelectionOnClick
                density="comfortable"
                initialState={{
                  sorting: {
                    sortModel: [{ field: "createdAt", sort: "desc" }],
                  },
                }}
                hideFooter={true}
              />
            </Box>
          )}

          {from === false && (
            <>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Box sx={{ backgroundColor: "#4fb1f2" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="inherit"
                    centered
                  >
                    <Tab label="All Orders" value={1} />
                    <Tab label="Pending Orders" value={2} />
                    <Tab label="Approved Orders" value={3} />
                  </Tabs>
                </Box>
              </Box>
              <TabPanel value={value} index={1}>
                <AllOrders orders={orders} columns={columns} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PendingOrders orders={orders} columns={columns} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ApprovedOrders orders={orders} columns={columns} />
              </TabPanel>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default SellerOrders;
