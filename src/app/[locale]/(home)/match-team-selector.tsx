import { useId } from "react";
import makeAnimated from "react-select/animated";
import { Team } from "@/db/schema";
import CreatableSelect from "react-select/creatable";

const animatedComponents = makeAnimated();

interface MatchTeamSelectorProps {
  teams: Team[];
  onChange: (teams: string[]) => void;
  value: string[];
  autoFocus?: boolean;
}

export function MatchTeamSelector({
  teams,
  onChange,
  value,
  autoFocus,
}: MatchTeamSelectorProps) {
  const instanceId = useId();
  const options = teams
    .filter(t => t.teamSize === 1)
    .map(team => ({
      value: team.name,
      label: team.name,
    }));

  return (
    <div className="group flex flex-col w-full group relative justify-end">
      <div data-slot="main-wrapper" className="h-full flex flex-col">
        <label
          className="subpixel-antialiased block text-foreground-500 pb-0 text-small pe-2 max-w-full text-ellipsis overflow-hidden"
          htmlFor={instanceId}
        >
          Team(s)
        </label>
        <div className="bg-default-100 rounded-md outline-none w-full mt-1.5">
          <CreatableSelect
            options={options}
            isMulti
            instanceId={instanceId}
            className="z-50 relatives"
            placeholder=""
            defaultValue={options.filter(option =>
              value.includes(option.value),
            )}
            unstyled={true}
            autoFocus={autoFocus}
            components={animatedComponents}
            classNames={{
              container: state => "w-full",
              valueContainer: state =>
                "background-transparent py-2 flex gap-1 px-2 py-1",
              placeholder: state => "px-3",
              input: state => "",
              menu: state =>
                "z-10 inline-flex flex-col justify-center subpixel-antialiased outline-none box-border text-small bg-content1 rounded-large shadow-medium w-full p-1 overflow-hidden mt-1.5",
              menuList: state => "p-3",
              option: state =>
                `flex group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 hover:transition-colors hover:bg-default hover:text-default-foreground data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground active:bg-red-100 ${
                  state.isFocused ? "bg-default" : ""
                }`,
              multiValue: state =>
                "relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-2 rounded-full bg-default text-default-foreground",
              multiValueRemove: state => "ml-2",
              dropdownIndicator: state => "pr-2",
              groupHeading: state =>
                "relative mt-2 mb-1 pl-2 text-tiny text-foreground-500",
            }}
            onChange={data => onChange(data.map(d => (d as any).value))}
          />
        </div>
      </div>
    </div>
  );
}
