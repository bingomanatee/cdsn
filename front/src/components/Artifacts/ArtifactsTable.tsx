import { DataTable } from "grommet";
import React from 'react';

const COLUMNS = [
  {property: 'id', primary: true, header: 'ID'},
  {property: 'name', header: 'Name'}
]
export default ({artifacts}) => {
  return <DataTable fill={"horizontal"} data={artifacts} columns={COLUMNS} />
}