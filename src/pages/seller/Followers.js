import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const SellerFollowers = () => {
  const followers = useSelector((state) => state.user.currentUser?.followers);
  return (
    <div>
      {followers.length === 0
        ? "No one is following your store yet."
        : [...followers]
            .slice(0, 4)
            .reverse()
            .map((user, id) => (
              <Typography key={user}>
                {id + 1}. <b>{user}</b>
              </Typography>
            ))}
    </div>
  );
};

export default SellerFollowers;
