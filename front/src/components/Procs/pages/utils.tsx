import HeadingWrapper from "../../HeadingWrapper";
import { Button, Box } from "grommet";
import { FormClose, Trigger } from "grommet-icons";
import React from "react";
import styled from "styled-components";

export const FormWrapper = styled.div`
  margin: 2rem;
  min-width: 800px;
  max-width: 90vw;
  height: ${({ height }) => height || "auto"};
  pre {
    max-height: 100px;
    overflow: scroll;
  }
`;
/**
 *  console.log("button clicked; adding ", state, "to", addProc);
 addProc({
          name: state.name.value,
          description: state.description.value,
          order: state.order.value
        });
 */

export const FormHeader = ({ formLeaf, level = 1, label }) => {
  return (
    <HeadingWrapper level={level} label={label}>
      <Button
        onClick={() => {
          formLeaf.do.cancel();
        }}
        icon={<FormClose />}
        plain
      />
    </HeadingWrapper>
  );
};

function triggerLabel(trigger, i) {
  if (trigger.name) {
    return trigger.name;
  }
  return `(trigger ${i + 1}`;
}

const TriggerButton = ({ formLeaf, triggerLeaf, trigger, i }) => {
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
        triggerLeaf.do.loadTrigger(i);
      }}
    />
  );
};

export const TriggerPaginator = ({ formLeaf, triggerLeaf }) => {
  return (
    <Box direction="row" fill="horizontal">
      {formLeaf.value.triggers.value.map((trigger, i) => (
        <TriggerButton
          formLeaf={formLeaf}
          triggerLeaf={triggerLeaf}
          trigger={trigger}
          i={i}
        />
      ))}
    </Box>
  );
};
