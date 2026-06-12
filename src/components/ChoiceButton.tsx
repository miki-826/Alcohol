"use client";

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function ChoiceButton({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-selected={selected}
      className="rounded-xl border-2 border-wood-brown bg-card px-4 py-3 text-sm text-foreground shadow-md transition-all hover:bg-amber-950 hover:-translate-y-0.5 data-[selected=true]:bg-main-red data-[selected=true]:border-accent data-[selected=true]:text-amber-50 data-[selected=true]:shadow-lg cursor-pointer"
    >
      {label}
    </button>
  );
}
