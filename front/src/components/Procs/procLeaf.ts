import { Leaf } from "@wonderlandlabs/forest";
import axios from "axios";

export default () => {
  return new Leaf(
    {
      procs: [],
      status: "pending",
      error: null,
      showForm: false
    },
    {
      actions: {
        addProc(leaf, proc) {
          console.log("--- adding proc", proc);
          leaf.do.setShowForm(false);
          leaf.do.setStatus("updating");
          axios
            .post("/api/proc", proc)
            .then(leaf.do.load)
            .catch((err) => {
              console.log("--- error saving proc", err);
              leaf.do.setStatus("error");
            });
        },
        cancelShowForm(leaf) {
          leaf.do.setShowForm(false);
        },
        showForm(leaf) {
          leaf.do.setShowForm(true);
        },
        onLoad(leaf, response) {
          leaf.do.setStatus("loaded");
          leaf.do.setProcs(response.data);
        },
        onFail(leaf, err) {
          leaf.do.setError(err);
          leaf.do.setStatus("fail");
        },
        load(leaf) {
          leaf.do.setStatus("loading");
          axios.get("/api/proc").then(leaf.do.onLoad).catch(leaf.do.onFail);
        }
      }
    }
  );
};
