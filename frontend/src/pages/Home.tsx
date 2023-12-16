import { observer } from "mobx-react-lite";
import ProgrammCard from "../components/ProgrammCard";
import ProgrammsLayout from "../components/ProgrammsLayout";

const Home = observer(() => {
  return (
    <>
      <section className="recs">
        <div className="container recs__container">
          <div className="main-rec">
            <ProgrammCard />
          </div>
          <ProgrammsLayout />
        </div>
      </section>
    </>
  );
});

export default Home;
