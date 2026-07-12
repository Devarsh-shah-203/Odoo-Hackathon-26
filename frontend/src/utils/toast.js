// Lightweight toast helpers using sonner if available, else console.
let sonner;
try {
  // eslint-disable-next-line
  sonner = require("sonner");
} catch {
  sonner = null;
}

export const toast = {
  success: (msg) => (sonner?.toast?.success ? sonner.toast.success(msg) : console.log("✅", msg)),
  error: (msg) => (sonner?.toast?.error ? sonner.toast.error(msg) : console.error("❌", msg)),
  info: (msg) => (sonner?.toast ? sonner.toast(msg) : console.log("ℹ️", msg)),
};