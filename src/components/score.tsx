export function Score({ score }: { score: number }) {
  return (
    <span className="border rounded p-1 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 font-light mr-1">
      {score}
    </span>
  );
}
