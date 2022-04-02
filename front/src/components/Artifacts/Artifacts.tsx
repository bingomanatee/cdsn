import * as React from "react";
import { Heading } from "grommet";
import {Leaf} from '@wonderlandlabs/forest';
import { useEffect, useState } from "react";
import axios from 'axios';
import ArtifactsTable from "./ArtifactsTable";

export default function Artifacts() {
  const [artifactLeaf, setAL] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const leaf = new Leaf({
      artifacts: [],
      status: 'pending',
      error: null,
    } ,{
      actions : {
        onLoad(leaf, response) {
          leaf.do.setStatus('loaded')
          leaf.do.setArtifacts(response.data);
        },
        onFail(leaf, err) {
          leaf.do.setError(err);
          leaf.do.setStatus('fail');
        },
        load(leaf) {
          leaf.do.setStatus('loading');
          axios.get('/api/artifact')
            .then(leaf.do.onLoad)
          .catch(leaf.do.onFail);
        }
      }
    });
    setAL(leaf);

    leaf.do.load();

    const sub = leaf.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  if (!(state && artifactLeaf)) {
    return <div>Loading...</div>;
  }

  return <>
    <Heading>Artifacts </Heading>

    { (state.status === 'loaded') ? <ArtifactsTable artifacts={state.artifacts} /> : '' }
    </>
}

