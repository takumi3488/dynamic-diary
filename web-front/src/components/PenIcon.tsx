import { Box, Button, Menu, MenuItem, MenuList } from "@mui/material";
import { signOut } from "firebase/auth";
import { MouseEvent, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { authClient } from "../utils/firebase/firebase";
import CreateIcon from "@mui/icons-material/Create";

const PenIcon = () => {
  const user = useCurrentUser();
  const auth = authClient();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  // メニュー
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        component="button"
        onClick={handleClick}
        sx={{
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          bgcolor: "#f0f0f0",
          padding: "0.3rem",
          border: "none",
          "&:hover": {
            bgcolor: "#dcdcdc",
            cursor: "pointer",
          },
        }}
      >
        <CreateIcon />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList dense>
          {user ? (
            <MenuItem
              onClick={() => {
                signOut(auth);
                handleClose();
              }}
              id="logout"
            >
              ログアウト
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                signInWithGoogle([
                  "https://www.googleapis.com/auth/contacts.readonly",
                ]);
                handleClose();
              }}
              id="login"
            >
              ログイン
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default PenIcon;
