export default function Pill({ text }: { text: string }) {
  return (
    <div className="isolate inline-flex rounded-md shadow-sm border border-neutral-300 bg-neutral-100 px-2 py-1 text-sm font-medium text-gray-700">
      {text}
    </div>
  )
}