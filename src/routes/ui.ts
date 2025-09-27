import { Router } from "express";

const router = Router();

/**
 * Minimal HTML page to quickly test common endpoints from a browser.
 * Open: http://<your-server>/api/_ui
 */
router.get("/_ui", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>API Test UI</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; line-height: 1.4; }
    h1 { margin-bottom: 8px; }
    .card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 16px; margin: 12px 0; }
    .row { display:flex; gap:8px; flex-wrap:wrap; margin: 8px 0; }
    input, button { font: inherit; padding: 8px 10px; border-radius: 8px; border: 1px solid #d1d5db; }
    button { cursor: pointer; border-color: #9ca3af; }
    small { color:#6b7280 }
    .muted { color:#6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <h1>API Test UI</h1>
  <p class="muted">Quick links/forms for common endpoints. Read-only routes use simple GET forms; write actions should be tested with Postman or your app.</p>

  <div class="card">
    <h3>Health</h3>
    <p><a href="/api/health" target="_blank">GET /api/health</a></p>
  </div>

  <div class="card">
    <h3>Market Prices</h3>
    <form action="/api/market/prices" method="GET" target="_blank">
      <div class="row">
        <input name="ids" placeholder="ids" value="solana,tron" />
        <input name="vs"  placeholder="vs"  value="usd" />
        <button type="submit">Query</button>
      </div>
      <small>Calls CoinGecko via your /api/market/prices route.</small>
    </form>
  </div>

  <div class="card">
    <h3>TRON — Account</h3>
    <form id="tronAccountForm" action="/api/tron/account/" method="GET" target="_blank" onsubmit="
      this.action='/api/tron/account/' + document.getElementById('tronAddr').value.trim();
    ">
      <div class="row">
        <input id="tronAddr" placeholder="Address (T... or 41...)" required />
        <button type="submit">Open</button>
      </div>
      <small>GET /api/tron/account/:address</small>
    </form>
  </div>

  <div class="card">
    <h3>TRC20 — Balance</h3>
    <form action="/api/trc20/balance" method="GET" target="_blank">
      <div class="row">
        <input name="token"  placeholder="Token (T... or 41...)" required />
        <input name="holder" placeholder="Holder (T... or 41...)" required />
        <button type="submit">Query</button>
      </div>
      <small>GET /api/trc20/balance?token=&holder=</small>
    </form>
  </div>

  <div class="card">
    <h3>TRC20 — Transfers (history)</h3>
    <form action="/api/trc20/transfers" method="GET" target="_blank">
      <div class="row">
        <input name="address" placeholder="Address (T...)" required />
        <input name="limit" type="number" value="20" />
        <button type="submit">Query</button>
      </div>
      <small>GET /api/trc20/transfers?address=&limit=</small>
    </form>
  </div>

  <div class="card">
    <h3>Solana JSON-RPC (example)</h3>
    <p><button id="btnSolana">POST /api/rpc/solana → getLatestBlockhash</button></p>
    <pre id="solanaOut" style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;padding:8px;border-radius:8px;"></pre>
  </div>

  <script>
    const $ = (s)=>document.querySelector(s);
    $('#btnSolana')?.addEventListener('click', async () => {
      const out = $('#solanaOut');
      out.textContent = 'Loading...';
      try {
        const r = await fetch('/api/rpc/solana', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body: JSON.stringify({
            jsonrpc:'2.0', id:1, method:'getLatestBlockhash', params:[{commitment:'finalized'}]
          })
        });
        const j = await r.json();
        out.textContent = JSON.stringify(j, null, 2);
      } catch (e) {
        out.textContent = String(e);
      }
    });
  </script>
</body>
</html>`);
});

export default router;
