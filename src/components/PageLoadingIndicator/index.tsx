import classNames from "../../utils/classNames";

// TYPES
type Props = {
  loading: boolean;
  children?: JSX.Element;
  size?: 'sm' | 'md' | 'lg';
}

const CSize: Record<'sm' | 'md' | 'lg', string> = {
  'sm': 'w-4 h-4',
  'md': 'w-8 h-8',
  'lg': 'w-12 h-12',
};

export default function PageLoadingIndicator({ loading, children, size = 'md' }: Props): JSX.Element {
  if (loading) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
      >
        <div
          style={{ borderTopColor: 'transparent' }}
          className={classNames(
            CSize[size],
            "border-4 border-gray-400 border-solid rounded-full animate-spin"
          )}
        >
        </div>
      </div>
    );
  } else {
    return children || <></>;
  } 
}