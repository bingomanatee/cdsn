import React, { useEffect, useState } from "react";
import { FormHeader, TriggerPaginator } from "./utils";
import { Fields, FormRow } from "../../../utils/FormRow";
import FieldRow from "../../../utils/FieldRow";
import { FieldType } from "../../../utils/types";
import { Button, Select, Spinner } from "grommet";
import { makePage2Leaf } from "./MakePage2Leaf";
import { Add, Edit, Save, Trigger, Close } from "grommet-icons";

export const Page2 = ({ state, formLeaf }) => {
  const [triggerLeaf, setTriggerLeaf] = useState(null);
  const [triggerState, setTriggerState] = useState(null);

  useEffect(() => {
    const leaf = makePage2Leaf(formLeaf);

    setTriggerLeaf(leaf);
    setTriggerState(leaf.value);
    const sub = leaf.subscribe((value) => {
      console.log("trigger state: ", value);
      setTriggerState(value);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!(triggerState && triggerLeaf && formLeaf)) {
    return <Spinner message="page 2 not ready" size="large" color="control" />;
  }

  return (
    <>
      <FormHeader label={"Add Trigger(s)"} formLeaf={triggerLeaf} />
      <Fields>
        <FieldRow label="Name" branch={triggerLeaf.branch("name")} />

        <FieldRow label="Query"
                  compType={FieldType.textarea}
                  branch={triggerLeaf.branch("query")} />

        <FieldRow label="Comparator" compType={FieldType.child}>
          <Select
            options={["EQ", "LT", "GT", "NE", "REGEX", "TRUE", "FALSE"]}
            value={state.query_comp}
            defaultValue={"TRUE"}
            onChange={({ option }) => {
              triggerLeaf.do.setQuery_comp(option);
            }}
          />
        </FieldRow>

        {triggerState.$useQueryValue ? (
          <FieldRow
            label="Compare To"
            branch={triggerLeaf.branch("query_value")}
          />
        ) : (
          <></>
        )}

        <TriggerPaginator formLeaf={formLeaf} triggerLeaf={triggerLeaf} />
        <FormRow noGrid>
          {state.editing.type === "trigger" ? (
            <>
            <Button
              icon={<Edit />}
              disabled={!triggerState.$isValid}
              reverse
              label="Update Trigger"
              onClick={() => {
                triggerLeaf.do.updateTrigger();
              }}
            />
              <Button
                icon={<Close />}
                primary
                reverse
                label="Cancel Trigger Edit"
                onClick={() => {
                  triggerLeaf.do.reset();
                  formLeaf.do.edit();
                }}
              />
            </Edit>
          ) : (
            <>
              <Button
                icon={<Add />}
                disabled={!triggerState.$isValid}
                reverse
                label="Add Trigger"
                onClick={() => {
                  triggerLeaf.do.addTrigger();
                }}
              />
              <Button
                icon={<Save />}
                disabled={!triggerState.$isValid}
                primary
                reverse
                label="Add Trigger and Save Process"
                onClick={() => {
                  triggerLeaf.do.addTrigger();
                  formLeaf.do.advance(2);
                }}
              />
              <Button
                icon={<Save />}
                disabled={!state.$isValid}
                primary
                reverse
                label="Save Process"
                onClick={() => {
                  triggerLeaf.do.addTrigger();
                  formLeaf.do.advance(2);
                }}
              />
            </>
          )}
        </FormRow>
        <pre>
          {JSON.stringify(triggerState, true, 2)}
        </pre>
      </Fields>
    </>
  );
};
