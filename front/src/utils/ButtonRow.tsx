import { Box } from "grommet";
import React from "react";

export default ({ children }) => (
  <Box
    margin="xsmall"
    gridArea="buttons"
    direction="row"
    fill="horizontal"
    justify="between"
    align="center"
    gap="medium"
  >
    {children}
  </Box>
);
