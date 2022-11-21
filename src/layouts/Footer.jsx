export default function Footer({ tool }) {
	return (
		<footer className="transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 text-gray-600 dark:text-white mt-auto border-t bottom-0 sticky border-gray-200 dark:border-gray-900 w-full">
			<div className="flex flex-row py-4 justify-center ">
				<p>{tool}</p>
			</div>
		</footer>
	);
}
