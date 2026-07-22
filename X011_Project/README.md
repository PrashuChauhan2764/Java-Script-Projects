# XO11 GCS — Ground Control Station Dashboard

Name: Prashu Chauhan
SAPID: 590016978
Program: Btech CSE

**A real-time Ground Control Station (GCS) interface for the XO11 UAV**, built for monitoring, mission planning, and flight safety. Developed as part of the XO11 UAV Systems CS/IT project assignment.

> Cockpit on the ground — live map, live telemetry, live alerts.

---

## 1. Overview

This project delivers a working GCS dashboard that an operator can use to:

- Track the UAV's live position on an interactive map
- Plan a mission by placing waypoints
- Monitor real-time flight telemetry (altitude, speed, battery, GPS, signal)
- Receive immediate alerts on unsafe flight conditions
- Review and export a full mission event log
- View a live MAVLink-style telemetry message stream

The current build runs entirely client-side with a realistic flight/battery/GPS simulation engine, so every module can be demonstrated without any physical hardware. It is structured so a real `pymavlink` telemetry feed can be dropped in behind the same UI (see [Section 7](#7-connecting-a-real-vehicle)).

**Live demo:** open `XO11_GCS_Dashboard.html` directly in any modern browser — no build step, no server required.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Structure | HTML5 | Single-file deliverable |
| Styling | CSS3 (embedded in the HTML file) | Custom design system, no framework |
| Logic | Vanilla JavaScript (ES6) | Simulation engine, DOM rendering, event handling |
| Map | [Leaflet.js](https://leafletjs.com/) + CartoDB Dark Matter tiles | Free, no API key required |
| Charts | [Chart.js](https://www.chartjs.org/) | Live altitude/battery trend |
| Fonts | Rajdhani, Inter, JetBrains Mono (Google Fonts) | HUD/avionics-style type system |

No installation, package manager, or backend is required to run the dashboard as delivered.

---

## 3. Project Structure

```
xo11-gcs/
├── XO11_GCS_Dashboard.html   # Main deliverable — full GCS app (HTML + CSS + JS)
└── README.md                 # This file
```

---

## 4. Getting Started

1. Download `XO11_GCS_Dashboard.html`.
2. Double-click it, or open it via **File → Open** in any modern browser (Chrome, Edge, Firefox).
3. That's it — the simulation engine starts automatically on load.

**To deploy as a live demo link** (optional, per submission requirements): drag-and-drop the HTML file into [Netlify Drop](https://app.netlify.com/drop), or push it to a GitHub repo and enable GitHub Pages / import into Vercel. No build configuration is needed since it's a static file.

---

## 5. Feature Walkthrough (Modules)

### Module 1 — Live Map & UAV Position
- Interactive dark-themed map (Leaflet.js)
- UAV shown as a rotating icon with a radar-sweep marker, heading-aware
- Breadcrumb trail drawn live as the UAV moves
- Click anywhere on the map to drop a numbered waypoint
- Waypoints connect into a dashed planned mission route
- Home/launch position marked separately
- **Start Mission** button switches to `AUTO` mode and flies the waypoint route in sequence

### Module 2 — Telemetry Dashboard
Live, continuously updating values for:
- Altitude (m), Airspeed (km/h), Ground Speed (km/h)
- Battery voltage (V), battery percentage, estimated flight time remaining
- GPS coordinates (lat/lon) and number of satellites locked
- Flight mode (`MANUAL` / `AUTO` / `RTH` / `HOLD`)
- Signal strength (4-bar indicator)
- Rolling 60-second altitude/battery chart

### Module 3 — Alert & Safety System
Threshold-based alerts, each timestamped and written to the mission log:
- **Battery LOW** — triggers below 25%
- **Battery CRITICAL** — triggers below 15%
- **GPS LOST** — triggers when satellites locked drop below 6
- **Signal WEAK** — triggers when link quality drops to 1 bar or lower
- Recovery/resolution events are logged as well (e.g. "GPS lock restored")

### Module 4 — Mission Log
- Scrolling, timestamped log of every system event: waypoints added/reached, mode changes, alerts, connection status
- **Export as `.txt`** and **Export as `.csv`** — both fully functional, download real files from the browser

### Module 5 — MAVLink Integration
- Live console simulating the actual MAVLink v2 message types the XO11 UAV uses: `HEARTBEAT`, `GLOBAL_POSITION_INT`, `SYS_STATUS`, `GPS_RAW_INT`
- Message fields are driven by the same simulated flight state as the rest of the dashboard, so the console and telemetry panel always agree
- A **Connect Real Vehicle** control documents the hand-off point for a real `pymavlink` backend (see [Section 7](#7-connecting-a-real-vehicle))

### Flight Mode Control
- Manual switching between `MANUAL`, `AUTO`, `RTH`, and `HOLD`
- `AUTO` follows the waypoint route; `RTH` returns to the home position and holds; `HOLD` stabilizes in place

### Demo / Test Triggers
Included specifically to make the required demo video straightforward to record — fire any alert condition on demand instead of waiting for it to occur naturally:
- Simulate Low Battery / Critical Battery
- Simulate GPS Loss
- Simulate Weak Signal
- Toggle Link Loss (disconnect/reconnect)
- Reset Simulation (returns to launch state)

---

## 6. Design Notes

The visual language is drawn from real avionics/HUD interfaces rather than a generic web-dashboard template:

- Bracketed "targeting reticle" panel corners
- Cyan / amber / red telemetry states mapped directly to alert severity
- Monospace data readouts for anything numeric or time-based (matches real GCS software conventions)
- A rotating radar-sweep marker on the UAV icon
- Dark, low-glare palette suited to an operations/monitoring context

---

## 7. Connecting a Real Vehicle

The dashboard currently runs on a local simulation engine (`tick()` in the embedded `<script>`), which is intentionally the same shape a real telemetry feed would take. To connect XO11's actual UAV:

1. Run a lightweight Python bridge using `pymavlink` that opens a MAVLink connection (serial or UDP) to the flight controller.
2. Have the bridge decode `HEARTBEAT`, `GLOBAL_POSITION_INT`, `SYS_STATUS`, and `GPS_RAW_INT` messages and forward them to the browser over a WebSocket or a small local HTTP/Flask endpoint.
3. In the dashboard's `tick()` function, replace the simulated `state.pos`, `state.altitude`, `state.battery`, `state.satellites`, etc. with values read from that live feed instead of the random-walk simulation.

Because every UI element (map, telemetry cells, alerts, log, MAVLink console) already renders from the shared `state` object, no other part of the dashboard needs to change — only where `state` gets its numbers from.

---

## 8. Known Limitations

- Telemetry is simulated in-browser; no physical or SITL vehicle connection is wired up in this deliverable.
- Browsers cannot open serial/UDP MAVLink connections directly — a backend bridge (Section 7) is required for a real vehicle, by design of how MAVLink and web browsers work.
- Single operator session only; there is no multi-user or persistent mission storage.

---

## 9. Challenges & What Was Learned

- Modeling realistic UAV movement (bearing/haversine-based navigation toward waypoints) without a physics engine, while keeping it simple enough to run every second in the browser.
- Keeping the alert system state-aware (trigger once, log recovery, avoid alert spam) instead of firing on every threshold check.
- Designing a telemetry-dense interface that stays legible rather than cluttered — solved by grouping into fixed-size cells with a single unit and consistent type scale.
- Structuring the app so a future real MAVLink feed only requires swapping the data source, not rebuilding the UI.

---

## 10. Author

XO11 UAV Systems — CS/IT Team
Contact: xo11uavsystems@gmail.com
