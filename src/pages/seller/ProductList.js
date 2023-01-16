import { forwardRef, useState } from "react";
import {
  IconButton,
  Typography,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Stack,
  Tabs,
  Tab,
  Box,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteSellerProduct, getProductsAsSeller } from "../../redux/apiCalls";
import EditProduct from "../../components/EditProduct";
import QuickSearchToolbar from "../../utils/QuickSearchToolbar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function AllProducts({ products, columns }) {
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
        loading={!products.length}
        rows={products}
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

function StockOutProducts({ products, columns }) {
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
          items: [{ columnField: "inStock", operatorValue: "<", value: "1" }],
        }}
        headerHeight={30}
        loading={!products.length}
        rows={products}
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

export default function SellerProductList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.product.products);
  const [deleteProductId, setDeleteProductId] = useState(false);
  const [editProductId, setEditProductId] = useState(false);
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

  const handleDelete = (id) => {
    setDeleteProductId(false);
    deleteSellerProduct(id).then(getProductsAsSeller(user.username, dispatch));
  };

  const handleCloseDialog = () => {
    setDeleteProductId(false);
  };

  const columns = [
    {
      field: "createdAt",
      headerClassName: "super-app-theme--header",
      headerName: "Created At",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.row.createdAt).toLocaleString()}
          </Typography>
        );
      },
    },
    {
      field: "_id",
      headerClassName: "super-app-theme--header",
      headerName: "Product ID",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Product",
      headerClassName: "super-app-theme--header",
      width: 400,
      headerAlign: "center",
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
      align: "center",
      headerAlign: "center",
    },
    {
      field: "inStock",
      type: "number",
      headerName: "Stock",
      headerClassName: "super-app-theme--header",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Typography sx={{ color: params.row.inStock === 0 && "red" }}>
            {params.row.inStock}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 220,
      align: "center",
      headerAlign: "center",
      description: "",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <IconButton
              aria-label="edit"
              onClick={() => setEditProductId(params.row._id)}
            >
              <Tooltip title="Edit">
                <Edit />
              </Tooltip>
            </IconButton>
            <IconButton
              disabled={params.row.isAdmin === true}
              aria-label="delete"
              onClick={() => setDeleteProductId(params.row._id)}
            >
              <Tooltip title="Delete">
                <DeleteOutlined />
              </Tooltip>
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }} disableGutters>
        {products.length === 0 ? (
          <Typography variant="h6">
            Start adding product to see them appear here.
          </Typography>
        ) : (
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
                  <Tab label="All Products" value={1} />
                  <Tab label="Stock Out Products" value={2} />
                </Tabs>
              </Box>
            </Box>
            <TabPanel value={value} index={1}>
              {/* {main} */}
              <AllProducts products={products} columns={columns} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* {StockOut} */}
              <StockOutProducts products={products} columns={columns} />
            </TabPanel>
          </>
        )}
      </Container>

      <Dialog
        TransitionComponent={Transition}
        transitionDuration={1000}
        open={Boolean(editProductId)}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setEditProductId(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Edit Product
        </DialogTitle>
        <DialogContent>
          <EditProduct productId={editProductId} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deleteProductId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you proceed now product with ID {deleteProductId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteProductId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
