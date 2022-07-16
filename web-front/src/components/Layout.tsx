import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
