import { observer } from "mobx-react-lite";

const SideChannelsItem = observer(() => {
  return (
    <a className="channel-item" href="">
      <div className="logo"></div>
      <div className="info">
        <span className="name">Первый</span>
        <span className="stream">Новости</span>
      </div>
    </a>
  );
});

const SideChannels = observer(() => {
  return (
    <>
      <div className="sidenav">
        <span className="header">Каналы</span>
        <SideChannelsItem />
        <SideChannelsItem />
        <SideChannelsItem />
      </div>
      <div className="sidenav-thumb"></div>
    </>
  );
});

export default SideChannels;
