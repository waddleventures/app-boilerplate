import { isEqual } from "lodash";
import Link from "next/link";
import { useContext, createContext, useEffect, useRef } from "react";

// UTILS
import classNames from "../../utils/classNames";

export type TBreadcrumbsPage = {
  name?: string;
  href: string;
};

export type TBreadcrumbsContext = {
  pages: TBreadcrumbsPage[]
  setBreadcrumbs: (pages: TBreadcrumbsPage[]) => void;
};

export const BreadcrumbsContext = createContext<TBreadcrumbsContext>({
  pages: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBreadcrumbs: () => {},
});

export const Breadcrumbs = ({ }) => {
  const { pages } = useContext(BreadcrumbsContext); 
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-neutral-500 hover:text-neutral-700 flex items-center space-x-2 text-sm group">
            <i className="ri-home-smile-line text-lg text-neutral-400 group-hover:text-neutral-500"></i>
            <span>Home</span>
          </Link>
        </li>
        {pages.map((page, idx) => (
          <li key={page.href}>
            <div className="flex items-center">
              <i className="ri-arrow-right-s-line text-xl text-neutral-400"></i>
              <Link
                href={page.href}
                className={classNames(
                  "ml-2 text-sm",
                  idx === pages.length - 1 ? 'font-medium text-neutral-600 hover:text-neutral-800' : 'text-neutral-500 hover:text-neutral-700'
                )}
              >
                {page.name || ''}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function useDeepCompareMemoize(page: TBreadcrumbsPage) {
  const ref = useRef<TBreadcrumbsPage | undefined>() 
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!isEqual(page, ref.current)) {
    ref.current = page
  }

  return ref.current
}

export const useBreadcrumbs = (pages?: TBreadcrumbsPage[]): void => {
  const { setBreadcrumbs } = useContext(BreadcrumbsContext);

  useEffect(() => {
    setBreadcrumbs(pages || []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, (pages || []).map(useDeepCompareMemoize));
}