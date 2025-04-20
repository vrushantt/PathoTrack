module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path based on your project structure
      "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };