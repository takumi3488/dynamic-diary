import { Box } from "@mui/system";
import React from "react";
import PenIcon from "./PenIcon";
import UserIcon from "./UserIcon";

const Header = () => {
  return (
    <Box
      component="header"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "solid 2px #e0e0e0",
        padding: "0.8rem",
        marginBottom: "0.3rem",
      }}
    >
      <Box>ここにロゴ</Box>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <PenIcon />
        <UserIcon />
      </Box>
    </Box>
  );
};

export default Header;
