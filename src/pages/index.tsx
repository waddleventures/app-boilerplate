// UTILS
import { useBreadcrumbs } from "../components/Breadcrumbs";

const HomePage = () => {
  // BREADCRUMBS
  useBreadcrumbs([])

  return (
    <> 
      <h1>Dashboard and cool stuff go here</h1>
    </>
  );
};

HomePage.requireAuth = true;

export default HomePage;

