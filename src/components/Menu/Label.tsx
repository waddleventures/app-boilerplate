import classNames from "../../utils/classNames";

export default function MenuLabel({ label }: { label: string }): JSX.Element {
  return (
    <div
      className={classNames(
        "text-xs text-neutral-400 font-semibold"
      )}
    >
      {label}
    </div>
  )
}