import { isObj, Leaf } from "@wonderlandlabs/forest";

const UNSET = Symbol("unset");

export function makeField(
  name,
  initial,
  validator: (value) => any | null = null,
  optional = false
) {
  function validate(value) {
    if (!validator) return null;
    try {
      return validator(value);
    } catch (err) {
      if (isObj(err) && err.message) {
        return err.message;
      }
      return err;
    }
  }

  return new Leaf(
    {
      name,
      value: initial,
      touched: false
    },
    {
      actions: {
        update: (leaf, event) => {
          leaf.do.updateValue(event.target.value);
        },
        updateValue(leaf, value) {
          leaf.do.setTouched(true);
          leaf.do.setValue(value);
        },
        reset(leaf, value = UNSET) {
          leaf.do.setTouched(false);
          leaf.do.setValue(value === UNSET ? initial : value);
        }
      },
      selectors: {
        isValid({ value, touched }) {
          return (optional || touched) && !validate(value);
        },
        error({ touched, value }) {
          return touched && validate(value);
        }
      }
    }
  );
}
