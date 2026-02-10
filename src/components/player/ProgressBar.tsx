interface Props {
  value: number;
  max: number;
  onChange: (v: number) => void;
}

export function ProgressBar({ value, max, onChange }: Props) {
  return (
    <input
      type="range"
      min={0}
      max={max || 0}
      step={0.1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-red-500"
    />
  );
}
