import React, { useEffect, useState } from "react";
import { Heading, Layer } from "grommet";
import { Spinner } from "grommet/es6";
import { procFormLeaf } from "./procFormLeaf";
import { FormWrapper } from "../../utils/FormWrapper";
import FieldRow from "../../utils/FieldRow";
import { FormHeader } from "./pages/utils";
import { Fields } from "../../utils/FormRow";
import { TextType } from "../../utils/types";

const FormComponent = ({ field }) => {
  let out = <>...</>;
  switch (field.res("part")) {
    case "field":
      const {
        data: { type: type = TextType.text, fieldType }
      } = field.value;
      out = (
        <FieldRow
          label={field.name}
          field={field}
          type={type}
          compType={fieldType}
        />
      );
      break;

    case "form":
      const f = field.child("fields").children;
      const fields = Array.from(f.values());
      const { data } = field.value;
      let name = field.name;
      if (data && data.title) {
        name = data.title;
      }
      out = (
        <>
          <Heading level={3}>{name}</Heading>
          {fields.map((fld) => {
            return <FormComponent field={fld} />;
          })}
        </>
      );
      break;
  }
  return out;
};

export default ({ id, addProc, cancel }) => {
  const [formLeaf, setFormLeaf] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const leaf = procFormLeaf(addProc, cancel, id);
    setFormLeaf(leaf);
    setState(state);
    const sub = leaf.subscribe((value) => {
      setState(value);
      console.log("--- procForm state:", value);
    });
    return () => sub.unsubscribe();
  }, []);

  if (!(state && formLeaf)) {
    return <Spinner />;
  }
  const f = formLeaf.child("fields").children;

  const fields = Array.from(f.values());
  return (
    <Layer>
      <FormWrapper height="80vh">
        <FormHeader label={"Process"} cancel={formLeaf.do.cancel} />
        <Fields>
          {fields.map((field) => {
            return <FormComponent field={field} />;
          })}
        </Fields>
      </FormWrapper>
    </Layer>
  );
};
