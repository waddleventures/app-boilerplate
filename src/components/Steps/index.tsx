/* eslint-disable react/no-children-prop */
// UTILS
import classNames from "../../utils/classNames";

// TYPES
export type StepProp = {
  name: string;
  description?: string;
  children?: JSX.Element | string;
  onClick?: () => void;
}

type Props = StepProp & {
  isLast?: boolean;
  isFirst?: boolean;
  status: 'completed' | 'current' | 'upcoming';
}

type MainProps = {
  steps: Omit<StepProp, 'onClick'>[];
  onClick: (idx: number) => void;
  currentStep: number;
}

const Step  = ({ name, description, children, onClick, isFirst = false, isLast = false, status }: Props) => (
  <li
    className={classNames(
      isLast ? 'pb-4' : '',
      isFirst ? 'pt-4' : '',
      'relative px-4'
    )}
  >
    {!isLast ? (
      <div
        className={classNames(
          "absolute top-6 left-6 -ml-px mt-0.5 h-full w-0.5",
          status === 'completed' ? "bg-emerald-600" : "bg-neutral-300"
        )}
        aria-hidden="true"
      />
    ) : null}
    <div onClick={onClick} className="group relative flex items-start">
      <div className="flex items-center">
        <span className="flex h-9 items-center">
          <span
            className={classNames(
              "relative z-10 flex h-4 w-4 items-center justify-center rounded-full",
              status === 'completed' ? 'bg-emerald-600 group-hover:bg-emerald-800' : '',
              status === 'current' ? 'bg-emerald-200' : '',
              status === 'upcoming' ? 'border-2 border-neutral-300 bg-white group-hover:border-neutral-400' : '',
            )}
          >
            {status === 'completed'
              ? (<i className="ri-check-line text-xs text-white" />)
              : (
                <span
                  className={classNames(
                    "h-2.5 w-2.5 rounded-full",
                    status === 'current' ? 'bg-emerald-600' : 'bg-transparent group-hover:bg-neutral-300',
                  )}
                />
            )}
          </span>
        </span>
        <div className="ml-4 flex min-w-64 w-64 max-w-64 flex-col">
          <span
            className={classNames(
              "text-sm font-medium",
              status === 'current' ? 'text-emerald-600' : '',
              status === 'upcoming' ? 'text-neutral-500' : '',
            )}
          >
            {name}
          </span>
          {description && (<span className="text-sm text-neutral-500">{description}</span>)}
        </div>
      </div>
      {children && (
        <div className="ml-4 flex-grow">
          {children}
        </div>
      )}
    </div>
  </li>
)

const deriveStepStatus = (stepIdx: number, currentStep: number): Props["status"] => {
  return stepIdx === currentStep 
    ? 'current'
    : stepIdx < currentStep
      ? 'completed'
      : 'upcoming';
}

export default function Steps({ steps, currentStep, onClick }: MainProps) {
  return (
    <nav className="relative">
      <div className="bg-neutral-50 absolute left-0 top-0 w-72 h-full z-auto rounded-xl" />
      <ol role="list" className="overflow-hidden">
        {steps.map((step, idx) => (
          <Step
            key={`step-${idx}`}
            {...step}
            onClick={() => onClick(idx)}
            isLast={idx === steps.length - 1}
            isFirst={idx === 0}
            status={deriveStepStatus(idx, currentStep)}
          />
        ))}
      </ol>
    </nav>
  )
}