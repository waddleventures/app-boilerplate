import classNames from "../../../utils/classNames";

export default function Label({ label, className }: { label: string, className?: string }) {
  return (
    <label className={classNames(className ? className : '', "block text-sm font-medium text-gray-700 mb-1")}>
      {label}
    </label>
  );
}