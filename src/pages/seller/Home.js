import { ArrowCircleRight } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { countSellerOrder, countSellerProduct, countSellerQuestion, countSellerReview, getOrderStatistics } from "../../redux/apiCalls";
import SellerFollowers from "./Followers";
import OrderChart from "./OrderChart";
import SellerOrders from "./Orders";

const SellerHome = () => {
  const [orderStats, setOrderStats] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await getOrderStatistics();
        res.map((item) =>
          setOrderStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Total Order": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);


  useEffect(() => {
    const getAllCounts = async () => {
      const promises = [];
      promises.push(countSellerProduct().then((res) => setProductCount(res)));
      promises.push(countSellerOrder().then((res) => setOrderCount(res)));
      promises.push(countSellerReview().then((res) => setReviewCount(res)));
      promises.push(countSellerQuestion().then((res) => setQuestionCount(res)));
      await Promise.all(promises);
    };
    getAllCounts();
  }, []);


  return (
    <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }} disableGutters>
      <Grid container spacing={3}>

      <Grid item xs={12} md={4} lg={3}>
                  <Box
                    sx={{
                      margin: "20px",
                      padding: "20px",
                      webkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
                      boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    {/* <Statistics /> */}
                    <Stack direction="column">
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        Statistics
                      </Typography>
                      <Typography variant="caption">
                        Products Added: {productCount}
                      </Typography>
                      <Typography variant="caption">
                        Orders Received: {orderCount}
                      </Typography>
                      <Typography variant="caption">
                        Reviews Received: {reviewCount}
                      </Typography>
                      <Typography variant="caption">
                        Questions: {questionCount}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>


        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <OrderChart
            data={orderStats}
            title="Order Chart"
            grid
            dataKey="Total Order"
          />
        </Grid>
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    Latest Sells will appear here
                  </Paper>
                </Grid> */}

        {/* Last 5 Users */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ p: 1, backgroundColor: "#67bcf3" }}>
            Last 5 Followers
          </Typography>
          <Divider />
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <SellerFollowers />
          </Paper>
        </Grid>

        {/* Last 3 Orders */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 1, backgroundColor: "#67bcf3" }}
          >
            <Typography variant="h6">Last 3 Orders</Typography>{" "}
            <Stack direction="row" alignItems="center" gap={1}>
              <ArrowCircleRight />
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/seller/orders`}
              >
                View All
              </Link>
            </Stack>
          </Stack>
          <Divider />
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <SellerOrders from={true} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SellerHome;
