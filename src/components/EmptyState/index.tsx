import classNames from "../../utils/classNames";

// TYPES
export type EmptyStateProps = {
  iconClass?: string;
  title: string;
  description?: string;
  action?: JSX.Element;
}

export default function EmptyState({ iconClass, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-6 bg-white">
      {iconClass && (
        <div className="text-gray-500">
          <i className={classNames(iconClass, 'text-2xl')}></i>
        </div>
      )}
      <h3 
        className={classNames(
          "mt-2 text-sm font-medium",
          !description ? "text-gray-500" : "text-gray-900"
        )}
      >{title}</h3>
      {description && (<p className="mt-1 text-sm text-gray-500">{description}</p>)}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}