import { observer } from "mobx-react-lite";
import ChannelCard from "./ChannelCard";

const ChannelsLayout = observer(() => {
  return (
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
  );
});

export default ChannelsLayout;
