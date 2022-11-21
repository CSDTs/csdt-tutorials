/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			height: {
				"50vh": "50vh",
				"csnap-normal": "calc(90vh - 8rem)",
				"csnap-normal-md": "calc(90vh - 9rem)",
				"csnap-text": "60vh",
				main: "calc(100vh - 120px)",
			},
		},
	},
	plugins: [],
};
