import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import HomeLayout from "../components/HomeLayout";

const Home = observer(() => {
  return (
    <>
      <Header />
      <HomeLayout />
    </>
  );
});

export default Home;
