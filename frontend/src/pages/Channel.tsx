import { StarOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const ScheduleItem = observer(() => {
  return (
    <>
      <div className="tvshow">
        <div className="time">21:00</div>
        <div className="name">"Клуб Веселых и Находчивых". Высшая лига</div>
      </div>
    </>
  );
});

const Channel = observer(() => {
  return (
    <>
      <section className="channel">
        <div className="container channel-container">
          <div className="channel-data">
            <div className="channel-logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/1%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB-5.svg/800px-1%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB-5.svg.png"
                alt="channel image"
              />
            </div>
            <div className="channel-info">
              <h1 className="name">Первый</h1>
              <p className="desc">Описание канала.</p>
              <p className="rate">
                Рейтинг канала: 8/10
                <StarOutlined className="rate-icon" />
              </p>
            </div>
          </div>
          <div className="channel-schedule">
            <span className="schedule-title">Расписание</span>
            <div className="schedule-list">
              <ScheduleItem />
              <ScheduleItem />
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Channel;
