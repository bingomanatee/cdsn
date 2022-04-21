import { isArr, isObj, isStr, isThere, Leaf } from "@wonderlandlabs/forest";
import { makeField } from "../../utils/MakeField";
import axios from "axios";

function validateTrigger(trigger) {
  return true;

  (trigger) => {
    if (!isObj(trigger)) {
      throw new Error("trigger must be an object");
    }
    if (!(trigger.query_comp_value && isStr(trigger.query))) {
      throw new Error("trigger query must be a non-empty string");
    }
    if (!trigger.comp) {
      throw new Error("trigger must have a comp");
    }
    if (["TRUE", "FALSE"].includes(trigger.comp)) {
      return false;
    }
    if (
      !["EQ", "EQ", "LT", "GT", "NE", "REGEX", "TRUE", "FALSE"].includes(
        trigger.comp
      )
    ) {
      throw new Error(`trigger.comp invalid: ${trigger.comp}`);
    }
    if (!isThere(trigger.comp) || trigger.comp === "") {
      throw new Error(`trigger.comp ${trigger.comp}must not be empty`);
    }
  };
}

export function procFormLeaf(addProc, cancel, id = "") {
  const leaf = new Leaf(
    {
      status: "new",
      page: 0,
      error: null,
      id,
      editing: { type: null, index: 0 }
    },
    {
      selectors: {
        isValid({ name, type, description, triggers }) {
          return (
            name.$isValid &&
            description.$isValid &&
            type.$isValid &&
            triggers.$isValid
          );
        },
        isValidProc({ name, type, description, triggers }) {
          return name.$isValid && description.$isValid && type.$isValid;
        },
        summary({ name, type, description, triggers }) {
          return {
            name: name.value,
            type: type.value,
            description: description.value,
            triggers: triggers.value
          };
        }
      },
      actions: {
        edit(leaf, type = null, index = 0) {
          leaf.do.setEditing({ type, index });
        },
        updateTrigger(leaf, trigger) {
          const triggersBranch = leaf.branch("triggers");
          const update = [...triggersBranch.value.value];
          update[leaf.value.editing.index] = trigger;
          triggersBranch.do.updateValue(update);
          leaf.do.edit();
        },
        addTrigger(leaf, trigger) {
          const triggersBranch = leaf.branch("triggers");
          const update = [...triggersBranch.value.value, trigger];
          triggersBranch.do.updateValue(update);
        },
        cancel(leaf) {
          leaf.do.reset();
          cancel();
        },
        advance(leaf, index = null) {
          if (index === null) {
            leaf.do.setPage(leaf.value.page + 1);
          } else leaf.do.setPage(index);
        },
        reset(leaf) {
          leaf.branch("name").do.reset();
          leaf.branch("type").do.reset();
          leaf.branch("description").do.reset();
          leaf.branch("triggers").do.reset([]);
          leaf.do.setStatus("new");
        },
        save(leaf) {
          const { $summary } = leaf.valueWithSelectors();
          $summary.triggers = {
            create: $summary.triggers
          };

          addProc($summary);
        },
        onLoad(leaf, result) {
          const { data: proc } = result;
          leaf.branch("name").do.setValue(proc.name);
          leaf.branch("type").do.setValue(proc.type);
          leaf.branch("description").do.setValue(proc.description);
          if (proc.triggers) {
            leaf.branch("triggers").do.setValue(proc.triggers);
          } else {
            leaf.branch("triggers").do.setValue([]);
          }
        },
        load(leaf) {
          axios
            .get("/api/proc/" + leaf.value.id)
            .then(leaf.do.onLoad)
            .catch(leaf.do.onLoadError);
        }
      },

      branches: {
        name: makeField("name", "", (value) => {
          if (!value.length) return "name must be present";
        }),
        type: makeField("type", "", (value) => {
          if (!value.length) return "type must be present";
        }),
        description: makeField("description", "", null, true),
        triggers: makeField("triggers", [], (triggers) => {
          if (!isArr(triggers)) return "triggers must be an array";
          if (!triggers.length) return "Must have at least one trigger";
          triggers.forEach(validateTrigger);
        })
      }
    }
  );

  if (id) {
    console.log("--- procFormLeaf: loading id ", id);
    leaf.do.load();
  }

  return leaf;
}
