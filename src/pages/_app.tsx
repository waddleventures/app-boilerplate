import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

// UTILS
import { api } from "../utils/api";

// STYLES
import "../styles/globals.css";

// TYPES
import { type NextApplicationPage } from "../types/nextApplicationPage.type";
import { type AppType } from "next/app";
import { type Session } from "next-auth";

// COMPONENTS
import Auth from "../pageComponents/Layout/Auth";
import DefaultLayout from "../pageComponents/Layout/Default";
import PortalLayout from "../pageComponents/Layout/Portal";

// TYPES
type Props = {
  Component: NextApplicationPage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any,
}

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}: Props) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session as Session}>
      {(Component.requireAuth || Component.isPortal) ? (
        <Auth>
          {Component.isPortal 
            ? (
              <PortalLayout>
                <>
                  <Component {...pageProps} />
                  <Toaster />
                </>
              </PortalLayout>
            )
            : (
                <DefaultLayout>
                  <>
                    <Component {...pageProps} />
                    <Toaster />
                  </>
                </DefaultLayout>
            )
          }
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default api.withTRPC(App);
