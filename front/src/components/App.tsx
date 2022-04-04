import { Box, Button, Grommet, Header, Main } from "grommet";
import { theme } from "../builder-theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "grommet-icons";
import { Homepage } from "./homepage";
import React from "react";
import Artifacts from "./Artifacts/Artifacts";
import Procs from "./Procs/Procs";
import { HeaderMenu } from "./HeaderMenu";
import { HomeIcon } from "./HomeIcon";

export const App = () => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <Box pad="0px" overflow="hidden" height="100%">
        <Header background="brand">
          <HomeIcon />
          <HeaderMenu />
        </Header>
        <Main pad="large" overflow={{ horizontal: "auto", vertical: "scroll" }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="artifacts" element={<Artifacts />} />
            <Route path="processes" element={<Procs />} />
          </Routes>
        </Main>
      </Box>
    </BrowserRouter>
  </Grommet>
);
