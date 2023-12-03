import CreatableSelect from "react-select/creatable";
import { useId } from "react";
import makeAnimated from "react-select/animated";
import {OptionProps} from 'react-select';

const animatedComponents = makeAnimated();

const options = [
  {
    value: "kh",
    label: "kh",
  },
  {
    value: "al",
    label: "al",
  },
];

// function Option({ innerProps, children }: OptionProps) {
//   return <div {...innerProps}>{children}</div>;
// }

export function MatchTeamSelector() {
  const instanceId = useId();

  return (
    <CreatableSelect
      options={options}
      isMulti
      instanceId={instanceId}
      className="z-50 relative"
      placeholder="Team 1"
      components={{
        ...animatedComponents,
        // Option,
      }}
    />
  );
}
