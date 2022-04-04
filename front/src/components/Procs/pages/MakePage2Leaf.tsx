import { isStr, Leaf } from "@wonderlandlabs/forest";
import { makeField } from "../../../utils/MakeField";

export function makePage2Leaf(formLeaf) {
  return new Leaf(
    { query_comp: "TRUE" },
    {
      name: "triggerForm",
      actions: {
        loadTrigger(leaf, index) {
          const trigger = formLeaf.value.triggers.value[index];
          if (trigger) {
            const { query, query_comp, name } = trigger;
            leaf.do.setQuery_comp(query_comp);
            leaf.branch("name").do.updateValue(name);
            leaf.branch("query").do.updateValue(query);
          }
        },
        addTrigger(leaf) {
          formLeaf.do.addTrigger(leaf.valueWithSelectors().$trigger);
          leaf.do.reset();
        },
        updateTrigger(leaf) {
          formLeaf.do.updateTrigger(leaf.valueWithSelectors().$trigger);
          leaf.do.reset();
        },
        reset(leaf) {
          leaf.branch("name").do.reset();
          leaf.branch("query").do.reset();
          leaf.branch("query_value").do.reset();
          leaf.do.setQuery_comp("TRUE");
          console.log("leaf after reset:", leaf);
        }
      },
      selectors: {
        useQueryValue({ query_comp }) {
          console.log('uqf value: ', query_comp);
          switch (query_comp) {
            case "TRUE":
              return false;
              break;

            case "FALSE":
              return false;
              break;

            default:
              return true;
          }
        },
        trigger(value) {
          const { name, query, query_comp } = value;
          return { name: name.value, query: query.value, query_comp };
        },
        isValid({ name, query }) {
          return (name.$isValid && query.$isValid);
        }
      },
      branches: {
        name: makeField(
          "name",
          "",
          (value) => {
            if (!isStr(value)) return "Name must be a string";
          },
          true
        ),
        query_value: makeField(
          "query_value",
          "",
          (value) => {
            if (!isStr(value)) return "query_value must be a string";
          },
          true
        ),
        query: makeField("query", "", (value) => {
          if (!(value && isStr(value))) {
            return "Query must be a non-empty string";
          }
        })
      }
    }
  );
}
