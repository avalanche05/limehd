import { StarOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const ProgrammCard = observer(() => {
  return (
    <div className="programm-card">
      <div className="programm-card__info">
        <h1 className="info__name">Вести, 12+</h1>
        <p className="info__rate">
          Рейтинг: 8/10
          <StarOutlined className="rate-icon" />
        </p>
        <div className="info__classify">
          <span className="info__kategory">Категория</span>
          <span className="info__genre">Жанр</span>
        </div>
      </div>
    </div>
  );
});

export default ProgrammCard;
