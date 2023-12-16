import { observer } from "mobx-react-lite";

const SideChannelsItem = observer(() => {
  return (
    <a className="channel-item" href="">
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/1%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB-5.svg/800px-1%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB-5.svg.png"
        alt="Channel logo"
      />
      <div className="info">
        <span className="name">Первый</span>
        <span className="stream">Новости</span>
      </div>
    </a>
  );
});

const SideChannels = observer(() => {
  return (
    <div className="sidenav">
      <span className="header">Каналы</span>
      <SideChannelsItem />
      <SideChannelsItem />
      <SideChannelsItem />
    </div>
  );
});

export default SideChannels;
