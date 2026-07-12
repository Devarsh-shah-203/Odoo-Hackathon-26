export default function Input({ label, className = "", ...props }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      {label && <span className="text-white/70">{label}</span>}
      <input
        {...props}
        className={`w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none backdrop-blur focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/30 ${className}`}
      />
    </label>
  );
}