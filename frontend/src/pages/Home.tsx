import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import HomeLayout from "../components/HomeLayout";
import SideChannels from "../components/sideChannels";

const Home = observer(() => {
  return (
    <>
      <Header />
      <div className="d-flex">
        <SideChannels />
        <HomeLayout />
      </div>
    </>
  );
});

export default Home;
