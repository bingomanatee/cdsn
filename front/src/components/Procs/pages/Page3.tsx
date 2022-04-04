import { FormHeader } from "./utils";
import { Fields, FormRow } from "../../../utils/FormRow";
import FieldRow from "../../../utils/FieldRow";
import { FieldType, TextType } from "../../../utils/types";
import { Button, Spinner, NameValueList, NameValuePair, Text } from "grommet";
import React from "react";
import { Next, Close, Save } from "grommet-icons";

export const Page3 = ({ state, formLeaf }) => {
  if (!(state && formLeaf)) {
    return <Spinner message="Loading Paga One" size="large" />;
  }
  return (
    <>
      <FormHeader label="Save Process" formLeaf={formLeaf} />
      <Fields>
        <FieldRow noGrid>
          <NameValueList>
            <NameValuePair name="Name">
              <Text color="text-strong">{state.name.value}</Text>
            </NameValuePair>
            <NameValuePair name="Description">
              <Text color="text-strong">{state.description.value}</Text>
            </NameValuePair>
            <NameValuePair name="Order">
              <Text color="text-strong">{state.order.value}</Text>
            </NameValuePair>
          </NameValueList>
        </FieldRow>

        <FormHeader level={2} label="Triggers" formLeaf={formLeaf} />

        <FieldRow noGrid>
          {state.triggers.value.map((trigger) => (
            <NameValueList>
              <NameValuePair name="Name">
                <Text color="text-strong">{trigger.name}</Text>
              </NameValuePair>
              <NameValuePair name="Query">
                <Text color="text-strong">
                  {trigger.query} {trigger.query_comp} {trigger.query_value}
                </Text>
              </NameValuePair>
            </NameValueList>
          ))}
        </FieldRow>

        <FormRow noGrid>
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
        </FormRow>
      </Fields>
    </>
  );
};
