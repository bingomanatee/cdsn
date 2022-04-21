import React, { useEffect, useState } from "react";
import { Layer } from "grommet";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { Page3 } from "./pages/Page3";
import { Spinner } from "grommet/es6";
import { procFormLeaf } from "./procFormLeaf";
import { FormWrapper } from "../../utils/FormWrapper";

export default ({ id = "", addProc, cancel }) => {
  console.log("loading id ", id);
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

  const Page = [Page1, Page2, Page3][state.page];
  if (!Page) {
    console.log("cannot get page for page:", state.page, "state:", state);
    return <Spinner message="no page" color="status-error" size="large" />;
  }

  return (
    <Layer>
      <FormWrapper height="80vh">
        <Page formLeaf={formLeaf} state={state} />
        {/*  <pre>
        {JSON.stringify(state, true, 3)}
      </pre> */}
      </FormWrapper>
    </Layer>
  );
};
