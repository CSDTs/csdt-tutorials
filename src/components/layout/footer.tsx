type Props = { tool: string };
export function Footer({ tool }: Props) {
  return (
    <footer className="sticky bottom-0 mt-auto w-full border-t border-gray-200 bg-white text-gray-600 transition-all duration-300 ease-in-out dark:border-gray-900 dark:bg-gray-800 dark:text-white">
      <div className="flex flex-row justify-center py-4">
        <p>{tool}</p>
      </div>
    </footer>
  );
}
