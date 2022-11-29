export function getArguments() {
  const args = process.argv.slice(2);
  const parsed = {};
  args
    .filter(arg => arg.startsWith("--"))
    .forEach(v => {
      let [key, value] = v.split("=");
      key = key.replace("--", "");
      if (!value) {
        parsed[key] = true;
        return;
      }
      parsed[key] = value;
    });

  return parsed;
}

export function getArgument(name: string, fallback: any = null) {
  const args = getArguments();
  return args[name] || fallback;
}
