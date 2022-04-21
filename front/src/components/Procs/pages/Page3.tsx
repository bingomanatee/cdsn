import { FormHeader } from "./utils";
import { Fields } from "../../../utils/FormRow";
import FieldRow from "../../../utils/FieldRow";
import { Button, Spinner, NameValueList, NameValuePair, Text } from "grommet";
import React from "react";
import { Close, Save } from "grommet-icons";
import ButtonRow from "../../../utils/ButtonRow";

export const Page3 = ({ state, formLeaf }) => {
  if (!(state && formLeaf)) {
    return <Spinner message="Loading Paga One" size="large" />;
  }
  return (
    <>
      <FormHeader label="Save Process" cancel={formLeaf.do.cancel} />
      <Fields>
        <FieldRow noGrid>
          <NameValueList>
            <NameValuePair name="Name">
              <Text color="text-strong">{state.name.value}</Text>
            </NameValuePair>
            <NameValuePair name="Description">
              <Text color="text-strong">{state.description.value}</Text>
            </NameValuePair>
            <NameValuePair name="Type">
              <Text color="text-strong">{state.type.value}</Text>
            </NameValuePair>
          </NameValueList>
        </FieldRow>

        <FormHeader level={2} label="Triggers" cancel={formLeaf.do.cancel} />

        <FieldRow noGrid>
          {state.triggers.value.map((trigger) => (
            <>
              <NameValueList>
                <NameValuePair name="Name">
                  <Text color="text-strong">{trigger.name}</Text>
                </NameValuePair>
                <NameValuePair name="Type">
                  <Text color="text-strong">{trigger.type}</Text>
                </NameValuePair>{" "}
                <NameValuePair name="Order">
                  <Text color="text-strong">{trigger.order}</Text>
                </NameValuePair>
                <NameValuePair name="Query">
                  <Text color="text-strong">
                    {trigger.query}
                    <br />
                    {trigger.query_comp} {trigger.query_comp_value}
                  </Text>
                </NameValuePair>
              </NameValueList>
              <hr />
            </>
          ))}
        </FieldRow>
      </Fields>
      <ButtonRow>
        <Button
          icon={<Close />}
          primary
          reverse
          label="Cancel"
          onClick={() => {
            formLeaf.do.cancel();
          }}
        />
        <Button
          icon={<Save />}
          disabled={!state.$isValid}
          primary
          reverse
          label="Save"
          onClick={() => {
            formLeaf.do.save();
          }}
        />
      </ButtonRow>
    </>
  );
};
