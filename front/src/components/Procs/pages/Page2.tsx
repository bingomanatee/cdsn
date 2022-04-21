import React, { useEffect, useState } from "react";
import { FormHeader, TriggerPaginator } from "./utils";
import { Fields } from "../../../utils/FormRow";
import FieldRow from "../../../utils/FieldRow";
import ButtonRow from "../../../utils/ButtonRow";

import { FieldType, TextType } from "../../../utils/types";
import { Button, Select, Spinner } from "grommet";
import { triggerLeaf } from "./triggerLeaf";
import { Add, Edit, Save, Close } from "grommet-icons";

export const Page2 = ({ state, formLeaf }) => {
  const [tLeaf, setTLeaf] = useState(null);
  const [triggerState, setTriggerState] = useState(null);

  useEffect(() => {
    const leaf = triggerLeaf(formLeaf);

    setTLeaf(leaf);
    setTriggerState(leaf.value);
    const sub = leaf.subscribe((value) => {
      console.log("trigger state: ", value);
      setTriggerState(value);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!(triggerState && tLeaf && formLeaf)) {
    return <Spinner message="page 2 not ready" size="large" color="control" />;
  }

  return (
    <>
      <FormHeader
        label={
          triggerState.id ? "Edit Trigger" + triggerState.id : "Add Trigger(s)"
        }
        cancel={formLeaf.do.cancel}
      />
      <Fields>
        <FieldRow label="Name" branch={tLeaf.branch("name")} />

        <FieldRow label="Type" branch={tLeaf.branch("type")} />
        <FieldRow
          label={"Order"}
          branch={tLeaf.branch("order")}
          type={TextType.number}
          filter={(value) => Number.parseInt(value, 10)}
        />
        <FieldRow
          label="Query"
          compType={FieldType.textarea}
          branch={tLeaf.branch("query")}
        />

        <FieldRow label="Comparator" compType={FieldType.child}>
          <Select
            options={["EQ", "LT", "GT", "NE", "REGEX", "TRUE", "FALSE"]}
            value={state.query_comp}
            defaultValue={"TRUE"}
            onChange={({ option }) => {
              tLeaf.do.setQuery_comp(option);
            }}
          />
        </FieldRow>

        {triggerState.$useQueryValue ? (
          <FieldRow
            label="Compare To"
            branch={tLeaf.branch("query_comp_value")}
          />
        ) : (
          <></>
        )}

        <TriggerPaginator formLeaf={formLeaf} triggerLeaf={tLeaf} />
      </Fields>
      <ButtonRow>
        {state.editing.type === "trigger" ? (
          <>
            <Button
              icon={<Edit />}
              disabled={!triggerState.$isValid}
              reverse
              label="Update Trigger"
              onClick={() => {
                tLeaf.do.updateTrigger();
              }}
            />
            <Button
              icon={<Close />}
              primary
              reverse
              label="Cancel Trigger Edit"
              onClick={() => {
                tLeaf.do.reset();
                formLeaf.do.edit();
              }}
            />
          </>
        ) : (
          <>
            <Button
              icon={<Add />}
              disabled={!triggerState.$isValid}
              reverse
              label="Save Trigger"
              onClick={() => {
                tLeaf.do.addTrigger();
              }}
            />
            <Button
              icon={<Save />}
              disabled={!state.$isValid}
              primary
              reverse
              label="Save Process"
              onClick={() => {
                formLeaf.do.advance(2);
              }}
            />
          </>
        )}
      </ButtonRow>
    </>
  );
};
