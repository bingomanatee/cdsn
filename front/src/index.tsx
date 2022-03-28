import * as React from "react";
import { render } from "react-dom";
import { Grommet, Button, Box, Main, Heading, Menu, Paragraph, Header } from "grommet";
import { Home } from "grommet-icons";
import { theme } from "./builder-theme";

const App = () => {
  return (
    <Grommet theme={theme}>
      <Box pad="0px" overflow="hidden" height="100%">
        <Header background="brand">
          <Button icon={<Home />} hoverIndicator />
          <Menu label="account" items={[{ label: "logout" }]} />
        </Header>
        <Main pad="large" overflow={{horizontal: 'auto', vertical: 'scroll'}}>
          <Heading>Something</Heading>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>
          <Paragraph>Something about something</Paragraph>

        </Main>
      </Box>
      <Box align="center" background="graph-2" pad="medium">
        <Button
          label="hello world"
          primary
          onClick={() => alert("hello, world")}
        />
      </Box>
    </Grommet>
  );
};

render(<App />, document.getElementById("root"));
