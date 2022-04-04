import { DataTable } from "grommet";
import React from "react";

const COLUMNS = [
  { property: "id", primary: true, header: "ID" },
  { property: "name", header: "Name" }
];
export default ({ procs }) => {
  return <DataTable fill={"horizontal"} data={procs} columns={COLUMNS} />;
};
