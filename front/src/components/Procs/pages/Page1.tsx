import { FormHeader } from "./utils";
import { Fields, FormRow } from "../../../utils/FormRow";
import FieldRow from "../../../utils/FieldRow";
import { FieldType, TextType } from "../../../utils/types";
import { Button, Spinner } from "grommet";
import React from "react";
import { Next } from "grommet-icons";

export const Page1 = ({ state, formLeaf }) => {
  if (!(state && formLeaf)) {
    return <Spinner message="Loading Paga One" size="large" />;
  }
  return (
    <>
      <FormHeader label="Add Process" formLeaf={formLeaf} />
      <Fields>
        <FieldRow label={"Name"} branch={formLeaf.branch("name")} />
        <FieldRow label={"Type"} branch={formLeaf.branch("type")} />
        <FieldRow
          label={"Description"}
          branch={formLeaf.branch("description")}
          compType={FieldType.textarea}
        />
        <FieldRow
          label={"Order"}
          branch={formLeaf.branch("order")}
          type={TextType.number}
        />

        <FormRow noGrid>
          <Button
            icon={<Next />}
            disabled={!state.$isValidProc}
            primary
            reverse
            label="Add Trigger"
            onClick={() => {
              formLeaf.do.advance();
            }}
          />
        </FormRow>
      </Fields>
    </>
  );
};