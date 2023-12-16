import { observer } from "mobx-react-lite";
import ProgrammCard from "./ProgrammCard";

const HomeLayout = observer(() => {
  return (
    <section className="recs">
      <div className="container recs__container">
        <div className="main-rec">
          <ProgrammCard />
        </div>
        <div className="other-recs">
          <div className="card-place">
            <ProgrammCard />
          </div>
          <div className="card-place">
            <ProgrammCard />
          </div>
          <div className="card-place">
            <ProgrammCard />
          </div>
          <div className="card-place">
            <ProgrammCard />
          </div>
          <div className="card-place">
            <ProgrammCard />
          </div>
          <div className="card-place">
            <ProgrammCard />
          </div>
        </div>
      </div>
    </section>
  );
});

export default HomeLayout;
