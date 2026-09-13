import { writeFile } from "node:fs/promises";

const targets = [
  ["gallery", ".our-moment-section"],
  ["comments", ".wishes-section"],
  ["wedding-gift", ".gift-section"],
];

const page = await fetch("http://127.0.0.1:9223/json/new?https://justwed.my.id/isi.html", { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let messageId = 0;
const pending = new Map();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  message.error ? reject(new Error(message.error.message)) : resolve(message.result);
});

function send(method, params = {}) {
  const id = ++messageId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await send("Page.enable");
await new Promise((resolve) => setTimeout(resolve, 5000));

for (const [name, selector] of targets) {
  await send("Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({block: "start"})`,
  });
  await new Promise((resolve) => setTimeout(resolve, 1800));
  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(`public/images/projects/justwed/${name}.png`, Buffer.from(data, "base64"));
}

await send("Page.close");
socket.close();
