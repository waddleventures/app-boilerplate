import classNames from "../../utils/classNames";

// TYPES
type AvatarWithNameProps = {
  name: string;
  size: 'sm' | 'md' | 'lg';
}

type Props = {
  initials: JSX.Element | string;
  size: 'sm' | 'md' | 'lg';
}

const getInitialsFromName = (name: string) => {
  const spaceIdx = name.indexOf(' ');
  if (spaceIdx === -1) return name.slice(0, 2); // No space, return the two first characters
  return `${name.slice(0,1)}${name.slice(spaceIdx + 1,spaceIdx + 2)}`;
}

const CSize = {
  'sm': 'h-6 w-6 text-xs',
  'md': 'h-10 w-10 text-sm',
  'lg': 'h-14 w-14 text-sm',
};

export function AvatarWithName({ name, size = 'md' }: AvatarWithNameProps): JSX.Element {
  const initials = getInitialsFromName(name);
  return <Avatar initials={initials} size={size} />
}

export function Avatar({ initials, size = 'md' }: Props): JSX.Element {
  return (
    <span 
      className={classNames(
        "inline-flex items-center justify-center rounded-full bg-neutral-200 shadow-sm",
        CSize[size]
      )}
    >
      <span className="font-regular leading-none text-gray-800">{initials}</span>
    </span>
  )
}