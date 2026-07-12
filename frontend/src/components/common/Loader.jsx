export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 p-8 text-white/70">
      <span className="h-3 w-3 animate-ping rounded-full bg-fuchsia-400" />
      <span className="text-sm tracking-wide">{label}</span>
    </div>
  );
}