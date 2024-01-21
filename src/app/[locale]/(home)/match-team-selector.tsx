import CreatableSelect from "react-select/creatable";
import { useId } from "react";
import makeAnimated from "react-select/animated";
import { OptionProps } from "react-select";
import { getLeagueTeamsForCurrentUser } from "@/db/model/league";
import { User } from "@nextui-org/react";

const animatedComponents = makeAnimated();

interface MatchTeamSelectorProps {
  teams: Awaited<ReturnType<typeof getLeagueTeamsForCurrentUser>>;
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
        <div {...innerProps} className="hover:bg-gray-50 px-2 py-1">
          Create team "{data.value}"
        </div>
      );
    }

    const description = team.members
      .map(member => {
        return member.name;
      })
      .join(", ");

    return (
      <div {...innerProps} className="hover:bg-gray-50 px-2 py-1">
        <User
          name={team.name}
          avatarProps={{ size: "sm" }}
          description={description}
        />
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
