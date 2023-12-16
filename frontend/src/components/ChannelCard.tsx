import { observer } from "mobx-react-lite";

const ChannelCard = observer(() => {
  return (
    <div className="channel-card">
      <div className="prev">
        <img
          className="channel-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/1%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB-5.svg/800px-1%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB-5.svg.png"
          alt="Channel Logo"
        />
        <span className="name">Первый</span>
      </div>
      <div className="schedule">
        <div className="schedule-item">
          <div className="time">18:00</div>
          <div className="tvshow-name">
            Кубок Первого канала по хоккею-2023. Прямая трансляция из
            Санкт-Петербурга. Сборная России - сборная Белоруссии
          </div>
        </div>
        <div className="schedule-item">
          <div className="time">19:30</div>
          <div className="tvshow-name">Вечерние новости (с субтитрами)</div>
        </div>
      </div>
    </div>
  );
});

export default ChannelCard;
