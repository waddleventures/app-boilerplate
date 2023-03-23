import classNames from "../../utils/classNames";

// TYPES
type Props = {
  loading: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CSize: Record<'sm' | 'md' | 'lg', string> = {
  'sm': 'w-5 h-5',
  'md': 'w-6 h-6',
  'lg': 'w-7 h-7',
};

export default function LoadingIndicator({ loading, size = 'md' }: Props): JSX.Element {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
    >
      {loading && (
        <div
          style={{ borderTopColor: 'transparent' }}
          className={classNames(
            CSize[size],
            "border-4 border-gray-400 border-solid rounded-full animate-spin"
          )}
        />
      )}
      {!loading && (
        <div
          className={classNames(
            CSize[size],
            "bg-emerald-700 text-white rounded-full flex items-center justify-center"
          )}
        >
          <i className="ri-check-line"></i>
        </div>
      )}
    </div>
  );
}