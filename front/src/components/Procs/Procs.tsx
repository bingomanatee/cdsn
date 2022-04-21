import * as React from "react";
import { Box, Button, Heading } from "grommet";
import { useEffect, useState } from "react";
import ProcTable from "./ProcTable";
import { Add } from "grommet-icons";
import ProcForm from "./ProcForm";
import makeProcLeaf from "./procLeaf";

export default function Procs() {
  const [procLeaf, setPL] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const leaf = makeProcLeaf();
    setPL(leaf);
    leaf.do.load();

    const sub = leaf.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  if (!(state && procLeaf)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box
        direction={"row"}
        fill={"horizontal"}
        justify={"between"}
        align="center"
      >
        <Heading>Processes</Heading>
        <Button
          icon={<Add />}
          label="Add Process"
          onClick={procLeaf.do.showForm}
        />
      </Box>

      {state.status === "loaded" ? (
        <ProcTable procs={state.procs} open={procLeaf.do.open} />
      ) : (
        ""
      )}
      {state.showForm ? (
        <ProcForm
          cancel={procLeaf.do.cancelShowForm}
          addProc={procLeaf.do.addProc}
          id={state.id}
        />
      ) : (
        ""
      )}
    </>
  );
}
