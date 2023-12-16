import { StarOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const Programm = observer(() => {
  return (
    <>
      <section className="programm">
        <img
          className="preview"
          src="//avatars.mds.yandex.net/get-tv-shows/69310/2a000001843336925214fddc97f7159b73da/alice_426_240"
          alt=""
        />
        <h1 className="title">Маша и Медведь</h1>
        <span className="category">Категория</span>
        <span className="genre">Жанр</span>
        <p className="rate">
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>1</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>2</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>3</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>4</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>5</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>6</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>7</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>8</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>9</span>
          </div>
          <div className="rate-score">
            <StarOutlined className="rate-icon" />
            <span>10</span>
          </div>
        </p>
        <p className="desc">
          Девочка Маша и Медведь - неразлучные друзья. В голову озорной Маши
          всегда приходят самые невероятные идеи, и поэтому каждый день героев
          наполнен весельем, приключениями и новыми открытиями.
        </p>
      </section>
    </>
  );
});

export default Programm;
