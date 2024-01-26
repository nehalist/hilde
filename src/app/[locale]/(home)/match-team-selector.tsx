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
  autoFocus
}: MatchTeamSelectorProps) {
  const instanceId = useId();
  const options = teams.map(team => ({
    value: team.name,
    label: team.name,
    __isNew__: false,
  }));
  const groupedOptions = [
    {
      label: "Players",
      options: teams.filter(t => t.teamSize === 1).map(team => ({
        value: team.name,
        label: team.name,
        __isNew__: false,
      }))
    },
    {
      label: "Teams",
      options: teams.filter(t => t.teamSize > 1).map(team => ({
        value: team.name,
        label: team.name,
        __isNew__: false,
      }))
    }
  ];

  return (
    <div
      className="group flex flex-col w-full group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]"
      data-slot="base"
      data-filled="true"
      data-filled-within="true"
      data-has-elements="true"
      data-has-label="true"
    >
      <div data-slot="main-wrapper" className="h-full flex flex-col">
        <div
          data-slot="input-wrapper"
          className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-unit-10 min-h-unit-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background"
          style={{ cursor: "text" }}
        >
          <label
            data-slot="label"
            className="absolute pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-foreground group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 top-1/2 -translate-y-1/2 group-data-[filled-within=true]:left-0 left-3 text-small group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden"
            id="react-aria-:R2arqnkqnkqH1:"
            htmlFor="react-aria-:R2arqnkqnkq:"
          >
            Team(s)
          </label>
          <CreatableSelect
            options={groupedOptions}
            isMulti
            instanceId={instanceId}
            className="z-50 relatives"
            placeholder=""
            defaultValue={options.filter(option =>
              value.includes(option.value),
            )}
            unstyled={true}
            autoFocus={autoFocus}
            // components={animatedComponents}
            classNames={{
              container: state => "w-full",
              valueContainer: state => "background-transparent",
              placeholder: state => "px-3",
              input: state => "px-3",
              menu: state =>
                "z-10 inline-flex flex-col justify-center subpixel-antialiased outline-none box-border text-small bg-content1 rounded-large shadow-medium w-full p-1 overflow-hidden mt-1.5",
              menuList: state => "p-3",
              option: state =>
                `flex group gap-2 items-center justify-between relative px-2 py-1.5 w-full h-full box-border rounded-small subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 hover:transition-colors hover:bg-default hover:text-default-foreground data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground active:bg-red-100 ${state.isFocused ? "bg-default" : ""}`,
              multiValue: state =>
                "ml-2 relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-2 h-6 rounded-full bg-default text-default-foreground",
              multiValueRemove: state => "ml-2",
              dropdownIndicator: state => "pr-2",
              groupHeading: state => "relative mt-2 mb-1 pl-2 text-tiny text-foreground-500",
            }}
            onChange={data => onChange(data.map(d => (d as any).value))}
          />
        </div>
      </div>
    </div>
  );
}
