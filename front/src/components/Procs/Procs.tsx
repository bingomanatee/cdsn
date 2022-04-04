import * as React from "react";
import { Box, Button, Heading } from "grommet";
import {Leaf} from '@wonderlandlabs/forest';
import { useEffect, useState } from "react";
import axios from 'axios';
import ProcTable from "./ProcTable";
import { Add } from "grommet-icons";
import ProcForm from "./ProcForm";

export default function Procs() {
  const [procLeaf, setPL] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const leaf = new Leaf({
      procs: [],
      status: 'pending',
      error: null,
      showForm: false,
    } ,{
      actions : {
        addProc(leaf, proc) {
          console.log('--- adding proc', proc);
          const {name, order, description} = proc;
          leaf.do.setShowForm(false);
          leaf.do.setStatus('updating');
          axios.post('/api/proc', {name, description, order})
            .then(leaf.do.load)
            .catch (err => {
              console.log('--- error saving proc');
            })
        },
        cancelShowForm(leaf) {
          leaf.do.setShowForm(false):
        },
        showForm(leaf) {
          leaf.do.setShowForm(true);
        },
        onLoad(leaf, response) {
          leaf.do.setStatus('loaded')
          leaf.do.setProcs(response.data);
        },
        onFail(leaf, err) {
          leaf.do.setError(err);
          leaf.do.setStatus('fail');
        },
        load(leaf) {
          leaf.do.setStatus('loading');
          axios.get('/api/proc')
            .then(leaf.do.onLoad)
          .catch(leaf.do.onFail);
        }
      }
    });
    setPL(leaf);

    leaf.do.load();

    const sub = leaf.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  if (!(state && procLeaf)) {
    return <div>Loading...</div>;
  }

  return <>
    <Box direction={"row"} fill={"horizontal"} justify={"between"} align="center">
      <Heading>Processes</Heading>
      <Button icon={<Add />} label="Add Process" onClick={procLeaf.do.showForm} />
    </Box>

    { (state.status === 'loaded') ? <ProcTable procs={state.procs} /> : '' }
    { (state.showForm) ? <ProcForm cancel={procLeaf.do.cancelShowForm} addProc={procLeaf.do.addProc} /> : ''}
    </>
}

