// COMPONENTS
import Button from "../../components/Buttons";

// TYPES
type Props = {
  iconClass: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any;
  signInFn: () => void;
}
export default function ProviderButton({ iconClass, provider, signInFn }: Props) {
  const onSignInWithProvider = () => {
    signInFn();
  };
  
  return (
    <div>
      <Button
        theme="secondary"
        iconClass={iconClass}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        label={provider.name as string}
        onClick={() => void onSignInWithProvider()}
        size="block"
      />
    </div>
  )
}