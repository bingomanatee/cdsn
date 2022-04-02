import { Leaf } from "@wonderlandlabs/forest";

const UNSET = Symbol('unset');
export function makeField(name, initial, validator, optional = false) {
  return new Leaf({
      value: initial,
      touched: false
    },
    {
      actions: {
        update: (leaf, event) => {
          console.log("setting ", name, "to", event.target.value);
          leaf.do.setTouched(true);
          leaf.do.setValue(event.target.value);
        },
        reset(leaf, value=UNSET) {
          leaf.do.setTouched(false);
          leaf.do.setValue(value === UNSET ? initial : value);
        }
      },
      selectors: {
        isValid: ({ value, touched }) => {
          return (optional || touched) && !validator(value);
        },
        touched: false
      }
    });
}