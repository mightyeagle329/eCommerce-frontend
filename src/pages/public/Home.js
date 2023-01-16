import Products from "../../components/Products";
import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import Offers from "../../components/Offers";
import FlashSale from "../../components/FlashSale";
import { useState } from "react";
import FollowedStore from "../../components/FollowedStore";
import { useSelector } from "react-redux";

const Home = ({ cartOpen, open }) => {
  const user = useSelector((state) => state.user.currentUser);
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

  return (
    <>
      <Offers />
      <FlashSale />

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
            <Tab label="Trending Now" value={1} />
            {user && <Tab label="Followed Stores" value={2} />}
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={1}>
        <Products cartOpen={cartOpen} open={open} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FollowedStore />
      </TabPanel>
    </>
  );
};

export default Home;
