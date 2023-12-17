import { observer } from "mobx-react-lite";
import { IChannel } from "../api/models";
import { Button, Rate, message } from "antd";
import { useStores } from "../hooks/useStores";
import { useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Props = {
  channel: IChannel | null;
};

const convertOneDigitStringToTwoDigits = (digit: number) => {
  return digit.toString().length === 1 ? `0${digit}` : digit;
};

const ChannelCard = observer(({ channel }: Props) => {
  const { rootStore } = useStores();
  const [messageApi, contextHolder] = message.useMessage();
  const [isFavorite, setIsFavorite] = useState(channel?.is_favorite);

  return (
    <>
      {contextHolder}
      {channel ? (
        <div className="channel-card">
          <Link to={`/channels/${channel.id}`}>
            <div className="prev">
              <img
                className="channel-logo"
                src={channel.image}
                alt="Channel Logo"
              />
              <span style={{ color: "#ffffff" }} className="name">
                {channel.name}
              </span>
            </div>
          </Link>
          <div
            className="d-flex"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 7,
            }}
          >
            <Rate
              style={{ color: "#DAED6D" }}
              allowHalf
              defaultValue={channel.rating}
              onChange={(value: number) =>
                rootStore
                  .postChannelRating(value, channel.id)
                  .then(() => {
                    messageApi.success("Отзыв добавлен");
                  })
                  .catch(() => {
                    messageApi.error("Ошибка добавления отзыва");
                  })
              }
            />

            <div>
              <Button
                style={{
                  marginLeft: 10,
                  backgroundColor: isFavorite ? "#DAED6D" : "#242424",
                  color: isFavorite ? "#fff" : "#6b7683",
                  border: "none",
                }}
                type="default"
                shape="circle"
                onClick={() => {
                  rootStore
                    .postProgramLike(channel.id)
                    .then(() => {
                      if (!isFavorite) {
                        messageApi.success("Канал добавлен в избранные");
                      } else {
                        messageApi.success("Канал удален из избранных");
                      }

                      setIsFavorite(!isFavorite);
                    })
                    .catch(() => {
                      messageApi.error("Ошибка добавления канала в избранное");
                    });
                }}
                icon={<HeartOutlined />}
              />
            </div>
          </div>
          <div className="schedule">
            <div className="schedule-item">
              <div className="tvshow-name">
                {channel.description.slice(0, 100)}...
              </div>
            </div>
            {channel.schedule.map((schedule) => {
              return (
                <div className="schedule-item">
                  <div className="time">
                    {new Date(schedule.start).getHours()}:
                    {convertOneDigitStringToTwoDigits(
                      new Date(schedule.start).getMinutes()
                    )}
                    -{new Date(schedule.finish).getHours()}:
                    {convertOneDigitStringToTwoDigits(
                      new Date(schedule.finish).getMinutes()
                    )}
                  </div>

                  <div className="tvshow-name">{schedule.program?.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
});

export default ChannelCard;
