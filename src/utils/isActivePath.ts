export const isActivePath = (href: string, routerPath: string, exactPathMatch = false) => {
  return exactPathMatch ? href === routerPath : routerPath.includes(href);
}