import { isStr, Leaf } from "@wonderlandlabs/forest";
import { makeField } from "../../../utils/MakeField";

export function triggerLeaf(formLeaf) {
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
          formLeaf.do.addTrigger(leaf.valueWithSelectors().$summary);
          leaf.do.reset();
        },
        updateTrigger(leaf) {
          formLeaf.do.updateTrigger(leaf.valueWithSelectors().$summary);
          leaf.do.reset();
        },
        reset(leaf) {
          leaf.branch("name").do.reset();
          leaf.branch("type").do.reset('');
          leaf.branch("query").do.reset();
          leaf.branch("order").do.reset(0);
          leaf.branch("query_comp_value").do.reset();
        //  leaf.do.setQuery_comp("TRUE");
        }
      },
      selectors: {
        useQueryValue({ query_comp }) {
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
        summary(value) {
          const { name, query, type, order, query_comp, query_comp_value } = value;
          return {
            name: name.value,
            type: type.value,
            query: query.value,
            order: order.value,
            query_comp,
            query_comp_value: query_comp_value.value
          };
        },
        isValid({ name, query }) {
          return name.$isValid && query.$isValid;
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
        order: makeField(
          "order",
          0,
          (value) => {
            if (typeof value === "number") {
              return null;
            } else if (typeof value === "string") {
              if (!/^[\d.]+$/.test(value)) {
                return "must be a number or numeric string";
              }
            }
            return null;
          },
          true
        ),
        type: makeField(
          "type",
          "",
          (value) => {
            if (!isStr(value)) return "Type must be a string";
          },
          true
        ),
        query_comp_value: makeField(
          "query_comp_value",
          "",
          (value) => {
            if (!isStr(value)) return "query_comp_value must be a string";
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
