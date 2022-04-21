import HeadingWrapper from "../../HeadingWrapper";
import { Box, Button } from "grommet";
import { FormClose, Trigger } from "grommet-icons";
import React from "react";

export const FormHeader = ({ cancel, level = 1, label }) => {
  return (
    <HeadingWrapper level={level} label={label}>
      <Button onClick={cancel} icon={<FormClose />} plain />
    </HeadingWrapper>
  );
};

function triggerLabel(trigger, i) {
  if (trigger.name) {
    return trigger.name;
  }
  return `(trigger ${i + 1}`;
}

const TriggerButton = ({ formLeaf, trigger, i }) => {
  let color = "light-4";
  const { type, index } = formLeaf.value.editing;
  if (type === "trigger" && i === index) {
    color = "black";
  }
  return (
    <Button
      size="small"
      color={color}
      margin={"4px"}
      icon={<Trigger />}
      label={triggerLabel(trigger, i)}
      onClick={() => {
        formLeaf.do.edit("trigger", i);
        formLeaf.do.advance(1);
      }}
    />
  );
};

export const TriggerPaginator = ({ formLeaf }) => {
  return (
    <Box direction="row" fill="horizontal">
      {formLeaf.value.triggers.value.map((trigger, i) => (
        <TriggerButton formLeaf={formLeaf} trigger={trigger} i={i} />
      ))}
    </Box>
  );
};
