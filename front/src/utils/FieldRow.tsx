import { Box, Text, TextArea, TextInput } from "grommet";
import React from "react";
import { FormRow } from "./FormRow";
import { FieldType, TextType } from "./types";

const Error = ({ branch }) => {
  if (!branch) return <></>;
  return branch.value.touched && branch.valueWithSelectors().$error ? (
    <Box gridArea="error">
      <Text color="status-critical">{branch.valueWithSelectors().$error}</Text>
    </Box>
  ) : (
    <></>
  );
};

export default ({
  label = "",
  branch = null,
  compType = FieldType.text,
  type = TextType.text,
  children = null,
  ...props
}) => {
  let comp = children;

  if (branch)
    switch (compType) {
      case "text":
        comp = (
          <TextInput
            type={type}
            {...props}
            value={branch.value.value}
            onChange={branch.do.update}
          />
        );
        break;

      case "textarea":
        comp = (
          <TextArea
            rows={5}
            {...props}
            value={branch.value.value}
            onChange={branch.do.update}
          />
        );
        break;

      case "child":
        comp = children;
        break;

      default:
        comp = (
          <TextInput
            {...props}
            value={branch.value.value}
            onChange={branch.do.update}
          />
        );
        break;
    }
  return (
    <FormRow>
      <Box gridArea="label" justify="center">
        <Text>{label}</Text>
      </Box>
      <Box gridArea="field">{comp}</Box>
      <Error branch={branch} />
    </FormRow>
  );
};
