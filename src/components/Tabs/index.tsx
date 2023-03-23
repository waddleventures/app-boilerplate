// UTILS
import classNames from "../../utils/classNames";

// TYPES
export type TabItem = {
  label: string;
  iconClass?: string;
}

type Props = {
  tabs: TabItem[];
  currTabIdx: number;
  className?: string;
  onClick: (tabIdx: number) => void;
}

export default function Tabs({ tabs, currTabIdx, className, onClick }: Props) {
  return (
    <div className={classNames("border-b border-gray-200", className ? className : '')}>
      <nav className="-mb-px flex space-x-4">
        {tabs.map((tab, idx) => (
          <div
            key={tab.label}
            className={classNames(
              currTabIdx === idx
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'group inline-flex items-center py-2 px-2 border-b-2 font-medium text-sm cursor-pointer'
            )}
            onClick={() => onClick(idx)}
          >
            {tab.iconClass && (
              <i
                className={classNames(
                  currTabIdx === idx 
                    ? 'text-emerald-500' 
                    : 'text-gray-400 group-hover:text-gray-500',
                  tab.iconClass ? tab.iconClass : '',
                  '-ml-0.5 mr-2 h-5 w-5'
                )}
              />
            )}
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>
    </div>
  )
}