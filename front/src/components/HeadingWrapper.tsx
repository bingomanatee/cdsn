import { Box, Heading } from "grommet";
import React from 'react';

export default ({level = 1, label, children}) => (
  <Box direction={"row"} fill={"horizontal"} justify={"between"} align="center">
    {label ? <Heading level={level}>{label}</Heading> : ''}
    {children}
  </Box>

)
