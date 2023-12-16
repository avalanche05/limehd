import { observer } from "mobx-react-lite";
import ChannelCard from "./ChannelCard";

const ChannelsLayout = observer(() => {
  return (
    <section className="channels">
      <div className="container channels-container">
        <div className="row">
          <div className="card-place">
            <ChannelCard />
          </div>
          <div className="card-place">
            <ChannelCard />
          </div>
          <div className="card-place">
            <ChannelCard />
          </div>
          <div className="card-place">
            <ChannelCard />
          </div>
        </div>
      </div>
    </section>
  );
});

export default ChannelsLayout;
