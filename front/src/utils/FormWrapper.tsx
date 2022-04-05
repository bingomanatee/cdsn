import { Grid } from "grommet";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 2rem;
  min-width: 800px;
  max-width: 90vw;
  height: ${({ height }) => height || "auto"};
  pre {
    max-height: 100px;
    overflow: scroll;
  }
`;

export const FormWrapper = ({ height, children }) => {
  return (
    <Wrapper height={height}>
      <Grid
        fill={true}
        areas={[
          { name: "title", start: [0, 0], end: [0, 0] },
          { name: "fields", start: [0, 1], end: [0, 1] },
          { name: "buttons", start: [0, 2], end: [0, 2] }
        ]}
        columns={["100%"]}
        rows={["80px", "auto", "80px"]}
      >
        {children}
      </Grid>
    </Wrapper>
  );
};
