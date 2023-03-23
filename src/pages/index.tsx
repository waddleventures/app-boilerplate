import { type NextApplicationPage } from "../types/nextApplicationPage.type";

const Home: NextApplicationPage = () => {

  return (
    <> 
      <h1>Dashboard and cool stuff go here</h1>
    </>
  );
};

Home.requireAuth = true;

export default Home;

