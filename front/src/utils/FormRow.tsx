import { Box } from "grommet";
import React from "react";
import { Grid } from "grommet";

export const FormRow = ({ children, noGrid = false }) => {
  if (noGrid) {
    return (
      <Box direction={"row"} margin={"small"} justify="between" align="center">
        {children}
      </Box>
    );
  }
  return (
    <Box direction={"row"} margin={"small"} align="center">
      <Grid
        rows={["auto", "auto"]}
        columns={["1/3", "2/3"]}
        gap="small"
        fill={"horizontal"}
        areas={[
          { name: "label", start: [0, 0], end: [0, 0] },
          { name: "field", start: [1, 0], end: [1, 0] },
          { name: "error", start: [0, 1], end: [1, 1] }
        ]}
      >
        {children}
      </Grid>
    </Box>
  );
};

export const Fields = ({ children }) => (
  <Box direction="column" style={{ maxWidth: "800px" }}>
    {children}
  </Box>
);
