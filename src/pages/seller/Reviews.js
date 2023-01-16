import { Info } from "@mui/icons-material";
import {
  Avatar,
  Container,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewsAsSeller } from "../../redux/apiCalls";
import QuickSearchToolbar from "../../utils/QuickSearchToolbar";

const SellerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getReviewsAsSeller().then((res) => {
      setReviews(res);
      setLoading(false);
    });
  }, []);


  const columns = [
    {
      field: "createdAt",
      headerName: "Reviewed At",
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
      field: "username",
      headerName: "Username",
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
      field: "product",
      headerName: "Review For",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Link
            to={`/product/${params.row.product._id}`}
            style={{ textDecoration: "none" }}
          >
            <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
              <Avatar src={params.row.product.img} alt="" />
              <Typography>{params.row.product.title}</Typography>
            </Stack>
          </Link>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Typography>{params.row.title}</Typography>;
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Rating name="read-only" value={params.row.rating} readOnly />;
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              color: !params.row.status ? "red" : "green",
            }}
          >
            {params.row.status ? "Approved" : "Awaiting"}
          </Typography>
        );
      },
    },
    {
      field: "message",
      headerName: "Message",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              "&:hover": {
                overflow: "visible",
                whiteSpace: "normal",
                position: "absolute",
              },
            }}
          >
            {params.row.message}
          </Box>
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
            <Link
              to={`/product/${params.row.product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Tooltip title="Visit Product Page">
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }} disableGutters>
        {!loading && reviews.length === 0 && (
          <Typography variant="h6">
            You have not received any review yet.{" "}
          </Typography>
        )}

        {!loading && reviews.length !== 0 && (
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#2263a5",
                breviewLeftWidth: 1,
                breviewColor: "#f1f8ff",
                color: "white",
              },
            }}
          >
            <DataGrid
              headerHeight={30}
              loading={loading}
              rows={reviews}
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
            <Typography>
              Awaiting review will be shown in product page once admin approves
              it.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default SellerReviews;
