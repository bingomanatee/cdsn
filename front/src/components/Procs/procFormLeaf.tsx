import { isArr, isObj, isStr, isThere, Leaf } from "@wonderlandlabs/forest";
import { Form } from "@wonderlandlabs/forest-io";
// import axios from "axios";
import { FieldType, TextType } from "../../utils/types";
/*
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
}*/

export function procFormLeaf(addProc, cancel, id = "") {
  const form = new Form("process", [
    {
      name: "name",
      value: "",
      validator: (v) => {
        if (!isStr(v)) {
          throw new Error("name must be a string");
        }
        if (!v.length) {
          return "name is required";
        }
        return false;
      },
      data: {
        fieldType: FieldType.text,
        title: "Name"
      }
    },
    {
      name: "description",
      value: "",
      validator: (v) => {
        if (!isStr(v)) {
          throw new Error("description must be a string");
        }
        return false;
      },
      data: {
        fieldType: FieldType.textarea,
        title: "Description"
      }
    }
  ]);

  form.addAction("triggers", (leaf) => {
    const fields = leaf.child("fields");
    const triggers = [];
    fields.eachChild((field) => {
      if (field.res("trigger")) {
        triggers.push(field);
      }
    });

    return triggers;
  });

  form.addAction("lastTrigger", (leaf) => {
    const triggers = leaf.do.triggers();
    return triggers.reduce((last, trigger) => {
      if (!last) {
        return trigger;
      }
      if (last.res("trigger-index") > trigger.res("trigger-index")) {
        return last;
      }
      return trigger;
    }, null);
  });

  form.addAction("addTrigger", (leaf) => {
    const lastTrigger = leaf.do.lastTrigger();

    const triggerIndex = lastTrigger ? lastTrigger.res("trigger-index") + 1 : 1;

    const triggerForm = leaf.do.addSubForm(`trigger-${triggerIndex}`, [
      {
        name: "name",
        value: "",
        validator(v) {
          if (typeof v !== "string") {
            throw new Error("name must be a string");
          }
          if (!v.length) {
            return "name is required";
          }
          return false;
        },
        data: {
          title: "Name"
        }
      },
      {
        name: "type",
        value: "",
        validator(v) {
          if (typeof v !== "string") {
            throw new Error("name must be a string");
          }
          return false;
        },
        data: {
          title: "Type"
        }
      },
      {
        name: "order",
        value: 0,
        validator(v) {
          if (typeof v !== "number") {
            throw new Error("order must be a number");
          }
          return false;
        },
        data: {
          fieldType: "text:number",
          title: "Order",
          type: TextType.number,
          filter(v) {
            if (isStr(v)) {
              return Number.parseInt(v);
            }
            return v;
          }
        }
      },
      {
        name: "query",
        value: "",
        validator(v) {
          if (typeof v !== "string") {
            throw new Error("name must be a string");
          }
          if (!v.length) {
            return "query is required";
          }
          return false;
        },
        data: {
          fieldType: "textarea"
        }
      },
      {
        name: "comparator",
        value: "",
        validator(v) {
          if (typeof v !== "string") {
            throw new Error("comparator must be a string");
          }
          if (!v.length) {
            return "query is required";
          }
          return false;
        },
        data: {
          fieldType: "select",
          options: ["EQ", "LT", "GT", "NE", "REGEX", "TRUE", "FALSE"]
        }
      }
    ]);
    triggerForm.next({ data: { title: "Trigger" } });
  });

  form.do.addTrigger();

  return form;
}

/**
 *
 *   const leaf = new Leaf(
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
 */
