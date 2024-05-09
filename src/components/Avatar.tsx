import * as React from "react";
import { Avatar as MuiAvatar, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Avatar = ({ name }: { name: string }) => {
  return (
    <MuiAvatar sx={{ width: 32, height: 32, bgcolor: blueGrey[300] }}>
      <Typography>
        {`${name.split(" ")[0]?.[0]}${name.split(" ")[1]?.[0]}`}
      </Typography>
    </MuiAvatar>
  );
};

export { Avatar };
