import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, Heading, Box, TextArea } from "grommet";
import { Leaf } from "@wonderlandlabs/forest";

function makeField(name, initial, validator, optional = false) {
  return new Leaf(
    {
      value: initial,
      touched: false
    },
    {
      actions: {
        update: (leaf, event) => {
          console.log("setting ", name, "to", event.target.value);
          leaf.do.setTouched(true);
          leaf.do.setValue(event.target.value);
        }
      },
      selectors: {
        isValid: ({ value, touched }) => {
          return (optional || touched) && !validator(value);
        },
        touched: false
      }
    }
  );
}

export default () => {
  const [formLeaf, setFormLeaf] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const leaf = new Leaf(
      {
        status: "new",
        error: null
      },
      {
        selectors: {
          isValid({ name, type, description }) {
            return name.$isValid && type.$isValid && description.$isValid;
          }
        },
        branches: {
          name: makeField("name", "", (value) => {
            if (!value.length) return "name must be present";
          }),
          type: makeField("type", "", (value) => {
            if (!value.length) return "type must be present";
          }),
          description: makeField("description", "", (value) => {}, true)
        }
      }
    );

    setFormLeaf(leaf);
    const sub = leaf.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  if (!(state && formLeaf)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Heading level={2}>Add Artifact</Heading>

      <Box direction="column" style={{ maxWidth: "800px" }}>
        <Box direction={"row"}>
          <Box basis="1/3" pad="small">
            <Text>Name</Text>
          </Box>
          <Box basis="2/3" pad="small">
            <TextInput
              value={state.name.value}
              onChange={formLeaf.branch("name").do.update}
            />
          </Box>
        </Box>

        <Box direction={"row"}>
          <Box basis="1/3" pad="small">
            <Text>Type</Text>
          </Box>
          <Box basis="2/3" pad="small">
            <TextInput
              value={state.type.value}
              onChange={formLeaf.branch("type").do.update}
            />
          </Box>
        </Box>

        <Box direction={"row"}>
          <Box basis="1/3" pad="small">
            <Text>Description</Text>
          </Box>
          <Box basis="2/3" pad="small">
            <TextArea
              rows={5}
              value={state.description.value}
              onChange={formLeaf.branch("description").do.update}
            />
          </Box>
        </Box>

        <Box direction={"row"} justify={"center"}>
          <Button disabled={!state.$isValid} primary label="Create Artifact" />
        </Box>
      </Box>
    </div>
  );
};
