"use client";

type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export default function WoodButton({
  label,
  onClick,
  disabled = false,
  variant = "primary",
}: Props) {
  const base =
    "rounded-lg border-2 px-8 py-4 text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 cursor-pointer disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "border-accent bg-main-red text-amber-50 hover:bg-red-800"
      : "border-wood-brown bg-card text-foreground hover:bg-amber-950";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles}`}
    >
      {label}
    </button>
  );
}
