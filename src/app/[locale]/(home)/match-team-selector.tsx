import CreatableSelect from "react-select/creatable";
import { useId } from "react";
import makeAnimated from "react-select/animated";
import { OptionProps } from "react-select";
import { getLeagueTeamsForCurrentUser } from "@/db/model/league";
import { Chip, User } from "@nextui-org/react";
import { Team } from "@/db/schema";

const animatedComponents = makeAnimated();

interface MatchTeamSelectorProps {
  teams: Team[];
  onChange: (teams: string[]) => void;
}

export function MatchTeamSelector({ teams, onChange }: MatchTeamSelectorProps) {
  const instanceId = useId();
  const options = teams.map(team => ({
    value: team.id,
    label: team.name,
    __isNew__: false,
  }));

  function Option({ innerProps, data }: OptionProps<typeof options[number]>) {
    const team = teams.find(team => team.id === data.value);

    if (!team) {
      return (
        <div {...innerProps} className="px-2 py-1">
          <Chip size="sm" color="primary">Create "{data.value}"</Chip>
        </div>
      );
    }

    return (
      <div {...innerProps} className="px-2 py-1">
        <Chip size="sm" color="secondary">{team.name}</Chip>
      </div>
    );
  }

  return (
    <CreatableSelect
      options={options}
      isMulti
      instanceId={instanceId}
      className="z-50 relative"
      placeholder="Teams"
      formatCreateLabel={inputValue => `Create team "${inputValue}"`}
      components={{
        ...animatedComponents,
        Option,
      }}
      styles={{
        multiValue: (styles, { data }) => {
          if (data.__isNew__) {
            return {
              ...styles,
              backgroundColor: "#60a5fa",
            };
          }
          return {
            ...styles,
          };
        },
      }}
      onChange={data => onChange(data.map(d => d.value))}
    />
  );
}
