// Run next to `npm run dev` or `npm start`: npm run scheduler
const base = process.env.PULSE_URL || "http://localhost:3000";
const headers = process.env.PULSE_CRON_SECRET ? { "x-cron-secret": process.env.PULSE_CRON_SECRET } : {};

async function tick() {
  try {
    const r = await fetch(`${base}/api/publish-due/`, { method: "POST", headers });
    const j = await r.json();
    if (j.published) console.log(new Date().toISOString(), "published", j.published);
  } catch (e) {
    console.log(new Date().toISOString(), "server not reachable:", e.message);
  }
}

console.log("Scheduler running against", base);
tick();
setInterval(tick, 60_000);
