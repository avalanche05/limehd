import { observer } from "mobx-react-lite";

const ChannelsSimplifyCard = observer(() => {
  return (
    <>
      <div className="channel-simplify-card">
        <div className="channel-image">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/MatchTV_Logo.svg/1200px-MatchTV_Logo.svg.png"
            alt="Channel logo"
          />
        </div>
        <div className="channel-info">
          <span className="name">Матч!</span>
          <p className="desc">Краткое описание</p>
        </div>
      </div>
    </>
  );
});

const ChannelsSimplifyLayout = observer(() => {
  return (
    <>
      <div className="row">
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
      </div>
    </>
  );
});

export default ChannelsSimplifyLayout;
