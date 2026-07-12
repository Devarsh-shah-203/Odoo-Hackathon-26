export default function Button({ children, className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50";
  const variants = {
    primary: "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-fuchsia-500/30",
    ghost: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    danger: "bg-red-500/90 text-white hover:bg-red-500",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}