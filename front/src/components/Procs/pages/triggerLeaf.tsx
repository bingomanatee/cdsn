import { isStr, Leaf } from "@wonderlandlabs/forest";
import { makeField } from "../../../utils/MakeField";
import axios from "axios";

export function triggerLeaf(formLeaf) {
  return new Leaf(
    { query_comp: "TRUE", id: "" },
    {
      name: "triggerForm",
      actions: {
        loadTrigger(leaf, index) {
          const trigger = formLeaf.value.triggers.value[index];
          if (trigger) {
            const { query, query_comp, name, order, type, id } = trigger;
            leaf.do.setQuery_comp(query_comp);
            leaf.branch("name").do.updateValue(name);
            leaf.branch("query").do.updateValue(query);
            leaf.branch("order").do.updateValue(order);
            leaf.branch("type").do.updateValue(type);
            leaf.do.setId(id);
          }
        },
        onLoad(leaf, result) {
          const { data } = result;
          leaf.branch("namee").do.updateValue(data.name);
          leaf.branch("query").do.updateValue(data.query);
        },
        load(leaf) {
          axios
            .get(`/api/prox/${this.id}`)
            .then(leaf.do.onLoad)
            .catch(leaf.do.onLoadError);
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
          leaf.branch("type").do.reset("");
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
          const { id, name, query, type, order, query_comp, query_comp_value } =
            value;
          return {
            id,
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
