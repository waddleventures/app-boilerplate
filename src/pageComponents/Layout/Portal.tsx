// COMPONENTS
import PortalTopBar from "../Portal/TopBar";

export default function PortalLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PortalTopBar />
      <div className="flex justify-center h-full min-h-full flex-grow">
        <div className="max-w-6xl w-full min-h-full py-4">
          {children}
        </div>
      </div>
    </div>
  );
}