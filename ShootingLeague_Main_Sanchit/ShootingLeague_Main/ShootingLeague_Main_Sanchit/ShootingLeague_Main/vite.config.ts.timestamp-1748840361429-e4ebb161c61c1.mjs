// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/hp/Downloads/ShootingLeague_Main_Sanchit/ShootingLeague_Main_Sanchit/ShootingLeague_Main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/hp/Downloads/ShootingLeague_Main_Sanchit/ShootingLeague_Main_Sanchit/ShootingLeague_Main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { tempo } from "file:///C:/Users/hp/Downloads/ShootingLeague_Main_Sanchit/ShootingLeague_Main_Sanchit/ShootingLeague_Main/node_modules/tempo-devtools/dist/vite/index.js";
var __vite_injected_original_dirname = "C:\\Users\\hp\\Downloads\\ShootingLeague_Main_Sanchit\\ShootingLeague_Main_Sanchit\\ShootingLeague_Main";
var conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}
var vite_config_default = defineConfig({
  plugins: [
    react({
      plugins: conditionalPlugins
    }),
    tempo()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3e3,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb3dubG9hZHNcXFxcU2hvb3RpbmdMZWFndWVfTWFpbl9TYW5jaGl0XFxcXFNob290aW5nTGVhZ3VlX01haW5fU2FuY2hpdFxcXFxTaG9vdGluZ0xlYWd1ZV9NYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb3dubG9hZHNcXFxcU2hvb3RpbmdMZWFndWVfTWFpbl9TYW5jaGl0XFxcXFNob290aW5nTGVhZ3VlX01haW5fU2FuY2hpdFxcXFxTaG9vdGluZ0xlYWd1ZV9NYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ocC9Eb3dubG9hZHMvU2hvb3RpbmdMZWFndWVfTWFpbl9TYW5jaGl0L1Nob290aW5nTGVhZ3VlX01haW5fU2FuY2hpdC9TaG9vdGluZ0xlYWd1ZV9NYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHsgdGVtcG8gfSBmcm9tIFwidGVtcG8tZGV2dG9vbHMvZGlzdC92aXRlXCI7XG5cbmNvbnN0IGNvbmRpdGlvbmFsUGx1Z2luczogW3N0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pl1bXSA9IFtdO1xuXG4vLyBAdHMtaWdub3JlXG5pZiAocHJvY2Vzcy5lbnYuVEVNUE8gPT09IFwidHJ1ZVwiKSB7XG4gIGNvbmRpdGlvbmFsUGx1Z2lucy5wdXNoKFtcInRlbXBvLWRldnRvb2xzL3N3Y1wiLCB7fV0pO1xufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIHBsdWdpbnM6IGNvbmRpdGlvbmFsUGx1Z2lucyxcbiAgICB9KSxcbiAgICB0ZW1wbygpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgb3BlbjogdHJ1ZVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbWUsT0FBTyxVQUFVO0FBQ3BmLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFTLGFBQWE7QUFIdEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSxxQkFBc0QsQ0FBQztBQUc3RCxJQUFJLFFBQVEsSUFBSSxVQUFVLFFBQVE7QUFDaEMscUJBQW1CLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7QUFDcEQ7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
