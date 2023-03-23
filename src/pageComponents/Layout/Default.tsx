import { useState } from "react";

// COMPONENTS
import LayoutSidebar from "./Sidebar";
import { Breadcrumbs, BreadcrumbsContext, type TBreadcrumbsPage } from "../../components/Breadcrumbs";

export default function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumbsPage[]>([]);

  return (
    <BreadcrumbsContext.Provider
      value={{
        pages: breadcrumbs,
        setBreadcrumbs,
      }}
    >
      <div className="w-screen h-screen flex bg-neutral-50">
        <LayoutSidebar />
        <main className="py-5 px-8 flex-grow overflow-x-hidden overflow-y-scroll">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </BreadcrumbsContext.Provider>
  )
}