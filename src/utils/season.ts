import getConfig from "next/config";

export function getCurrentSeason() {
  const { publicRuntimeConfig } = getConfig();
  return +publicRuntimeConfig.season;
}
