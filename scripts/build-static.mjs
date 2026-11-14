import { spawnSync } from "node:child_process";
const r = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: true, env: { ...process.env, PULSE_STATIC: "1" } });
process.exit(r.status ?? 1);
