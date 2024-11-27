/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    	"./src/**/*.{js,jsx,ts,tsx}",
  	],
  	theme: {
    	extend: {
			gridTemplateColumns: {
				'21': '80px repeat(20, minmax(0, 1fr))',
			}
		},
  	},
  	plugins: [],
}

