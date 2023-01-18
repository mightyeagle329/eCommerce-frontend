import { Divider, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Shop from "../pages/public/Shop";

const FollowedStore = ({ cartOpen = false }) => {
  const followedStores = useSelector(
    (state) => state.user.currentUser.followedStores
  );

  return (
    <>
      {followedStores.length === 0 ? (
        <Typography>
          You are not currently following any stores. Follow to see latest
          products from your favorite shops appear here.
        </Typography>
      ) : (
        <>
          <Typography variant="caption">
            You are currently following{" "}
            <span style={{ color: "blue", fontWeight: "bolder" }}>
              {followedStores.length}
            </span>{" "}
            store(s) :
          </Typography>
          {followedStores.map((store, id) => (
            <>
              <b>
                {store}
                {id + 1 < followedStores.length ? ", " : "."}
              </b>
            </>
          ))}
          <Divider variant="middle" />
          {followedStores.map((store) => (
            <Shop cartOpen={cartOpen} providedShopName={store} key={store} />
          ))}
        </>
      )}
    </>
  );
};
export default FollowedStore;
