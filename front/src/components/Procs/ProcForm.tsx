import React, { useEffect, useState } from "react";
import { Heading, Layer, TextArea, TextInput } from "grommet";
import { Spinner } from "grommet/es6";
import { procFormLeaf } from "./procFormLeaf";
import { FormWrapper } from "../../utils/FormWrapper";
import FieldRow from "../../utils/FieldRow";
import { FormHeader } from "./pages/utils";
import { Fields } from "../../utils/FormRow";

const FormComponent = ({ field }) => {
  let out = <>...</>;
  switch (field.res("part")) {
    case "field":
      out = (
        <FieldRow
          label={field.name}
          branch={field}
          compType={field.value.data.fieldType}
        />
      );
      break;

    case "form":
      out = <p>form {field.name}</p>;
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
  console.log("fields root:", f, "of ", formLeaf);
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
