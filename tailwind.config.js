/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        animation: {
          typewriter: "typewriter 2s steps(11) forwards"
        },
        keyframes: {
          typewriter: {
            to: {
              left: "100%"
            }
          }
        }
      },
    },
    plugins: [],
  }
  