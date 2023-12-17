import { observer } from "mobx-react-lite";
// import ProgrammCard from "./ProgrammCard";

const ProgrammsLayout = observer(() => {
  return (
    <div className="row">
      <div className="card-place">
        {/*<ProgrammCard />*/}
      </div>
      <div className="card-place">
        {/*<ProgrammCard />*/}
      </div>
      <div className="card-place">
        {/*<ProgrammCard />*/}
      </div>
    </div>
  );
});

export default ProgrammsLayout;
