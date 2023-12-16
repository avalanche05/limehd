import { observer } from "mobx-react-lite";
import ChannelsLayout from "../components/ChannelsLayout";

const Channels = observer(() => {
  return (
    <>
      <section className="channels">
        <div className="container channels-container">
          <ChannelsLayout />
        </div>
      </section>
    </>
  );
});

export default Channels;
