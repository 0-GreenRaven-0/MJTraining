export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['debugger'],
    pure: process.env.NODE_ENV === 'production' ? ['console.log'] : [],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})