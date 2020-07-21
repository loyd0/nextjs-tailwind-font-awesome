module.exports = {
    purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        boxShadow: {
          'row': `0 0 9px 0 rgba(0,0,0,0.18)`
        }
      },
    },
    variants: {
      opacity: ["disabled", "hover", "responsive"]
    },
    plugins: [
      require('@tailwindcss/ui')
    ]
  }
  
  
  