import { FunctionComponent, useEffect } from "react";
import { trpc } from "~/utils/trpc";
import { useStore } from "~/utils/store";

export const SeasonSelector: FunctionComponent = () => {
  const season = trpc.seasons.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { season: selectedSeason, setSeason } = useStore();

  useEffect(() => {
    if (!season.data) {
      return;
    }
    setSeason(season.data.find(s => s.current)?.number || 1);
  }, [season.data, setSeason]);

  if (season.isLoading || !season.data) {
    return null;
  }

  return (
    <small className="opacity-50 text-xs leading-5 font-light uppercase">
      Season{" "}
      <select
        className="bg-transparent w-auto uppercase dark:bg-gray-900"
        value={selectedSeason}
        onChange={e => setSeason(+e.target.value)}
      >
        {season.data.map(season => (
          <option key={season.id}>{season.number}</option>
        ))}
      </select>
    </small>
  );
};
