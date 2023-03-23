// TYPES
type Props = {
  title: string;
  description? : string;
  children?: JSX.Element;
}

export default function PageTitle({ title, description, children }: Props): JSX.Element {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-medium">{title}</h1>
        {description && (<div className="text-md text-neutral-500">{description}</div>)}
      </div>
      {children && children}
    </div>
  )
}