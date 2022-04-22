import { Box, Text, TextArea, TextInput } from "grommet";
import React from "react";
import { FormRow } from "./FormRow";
import { FieldType, TextType } from "./types";
import { Alert } from "grommet-icons";

const Error = ({ field }) => {
  if (!field) return <></>;
  return field.value.touched && field.valueWithSelectors().$error ? (
    <Box gridArea="error">
      <Text color="status-critical">{field.valueWithSelectors().$error}</Text>
    </Box>
  ) : (
    <></>
  );
};

export default ({
  label = "",
  field = null,
  branch = null,
  compType = FieldType.text,
  type = TextType.text,
  children = null,
  ...props
}) => {
  let comp = children;
  if (branch) field = branch;

  const {
    $error,
    data: { title, filter },
    value
  } = field.valueWithSelectors();

  const onChange = (event) => {
    if (filter) {
      field.do.update(filter(event.target.value));
    } else {
      field.do.updateFromEvent(event);
    }
  };

  const icon: any = $error ? <Alert color="status-critical" /> : "";
  console.log("field: ", field.name, "type: ", type);
  if (field)
    switch (compType) {
      case FieldType.text:
        comp = (
          <TextInput type={type} {...props} value={value} onChange={onChange} />
        );
        break;

      case FieldType.textarea:
        comp = (
          <TextArea rows={5} {...props} value={value} onChange={onChange} />
        );
        break;

      case FieldType.child:
        comp = children;
        break;

      default:
        comp = (
          <TextInput {...props} type={type} value={value} onChange={onChange} />
        );
        break;
    }
  return (
    <FormRow>
      <Box gridArea="label" justify="center">
        <Text>
          {icon} {title ? title : label}
        </Text>
      </Box>
      <Box gridArea="field">{comp}</Box>
      <Error field={field} />
    </FormRow>
  );
};
