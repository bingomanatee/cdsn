import { Button } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "grommet-icons";

export function HomeIcon() {
  const nav = useNavigate();
  return (
    <Button
      icon={<Home />}
      hoverIndicator
      onClick={() => {
        nav("/", { replace: true });
      }}
    />
  );
}
