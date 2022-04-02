import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Text, TextArea, TextInput ,Layer} from "grommet";
import { Leaf } from "@wonderlandlabs/forest";
import { makeField } from "../../utils/MakeField";
import styled from "styled-components";
import HeadingWrapper from "../HeadingWrapper";
import { FormClose } from "grommet-icons";

const FormWrapper = styled.div`
  margin: 2rem;
  min-width: 500px;
  max-width: 1000px;
`;

const FormRow = ({children}) => (
  <Box direction={"row"} margin={'small'} align="center">{children}</Box>
)

export default ({addProc, cancel}) => {
  const [formLeaf, setFormLeaf] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const leaf = new Leaf({
      status: 'new',
      error: null
    }, {
      selectors: {
        isValid({name, type, description}) {
          return name.$isValid && type.$isValid && description.$isValid;
        }
      },
      actions: {
        reset(leaf) {
          leaf.branch('name').do.reset();
          leaf.branch('order').do.reset(0);
          leaf.branch('description').do.reset();
          leaf.do.setStatus('new');
        }
      },

      branches: {
        name: makeField('name', '', (value) => {
          if (!value.length) return 'name must be present';
        }),
        order: makeField('order', 0, (value) => {
          if (!value.length) return 'type must be present';
        }),
        description: makeField('description', '', (value) => {

        }, true)
      }
    });

    setFormLeaf(leaf);
    const sub = leaf.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  if (!(state && formLeaf)) {
    return <div>Loading...</div>;
  }

  return <Layer>
    <FormWrapper>
      <HeadingWrapper level={2} label="Add Process"> <Button onClick={() => {formLeaf.do.reset(); cancel()}} icon={<FormClose/>} plain /></HeadingWrapper>

    <Box direction="column" style={{maxWidth: '800px'}}>

      <FormRow>
        <Box basis="1/3" ><Text>Name</Text></Box>
        <Box basis="2/3" >
          <TextInput value={state.name.value} onChange={formLeaf.branch('name').do.update} />
        </Box>
      </FormRow>


      <FormRow>
        <Box basis="1/3" ><Text>Description</Text></Box>
        <Box basis="2/3" >
          <TextArea rows={5} value={state.description.value} onChange={formLeaf.branch('description').do.update} />
        </Box>
      </FormRow>

      <FormRow>
        <Box basis="1/3" ><Text>Order</Text></Box>
        <Box basis="2/3" >
          <TextInput type="number" value={state.order.value} onChange={formLeaf.branch('order').do.update} />
        </Box>
      </FormRow>

      <FormRow>
        <Button disabled={!state.$isValid} primary label="Create Process" onClick={() => addProc(state)} />
      </FormRow>

    </Box>
  </FormWrapper>
  </Layer>

}