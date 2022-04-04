import { Menu } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "grommet-icons";

export function HeaderMenu() {
  const nav = useNavigate();
  return (
    <Menu
      dropAlign={{ right: "right", top: "bottom" }}
      dropBackground="brand"
      label={<MenuIcon color="white" />}
      items={[
        {
          label: "Home",
          onClick: () => {
            nav("/", { replace: true });
          }
        },
        {
          label: "Processes",
          onClick: () => {
            nav("/processes", { replace: true });
          }
        }
      ]}
    ></Menu>
  );
}
