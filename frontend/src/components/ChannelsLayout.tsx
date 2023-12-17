import { observer } from "mobx-react-lite";
import ChannelCard from "./ChannelCard";
import { useStores } from "../hooks/useStores";
import { useEffect, useState } from "react";
import { Skeleton, message } from "antd";
import { IChannel } from "../api/models";

const ChannelsLayout = observer(() => {
  const { rootStore } = useStores();
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setIsLoading(true);

    rootStore
      .fetchChannels()
      .then((channels): void => {
        setChannels(channels);
      })
      .catch(() => {
        messageApi.error("Ошибка загрузки каналов");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [rootStore, messageApi]);

  return (
    <>
      {contextHolder}
      <section className="channels">
        {isLoading ? (
          <div className="row">
            {Array(16)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="card-place">
                  <Skeleton loading={isLoading}></Skeleton>
                </div>
              ))}
          </div>
        ) : null}

        <div className="container channels-container">
          <div className="row">
            {channels.map((channel) => {
              return (
                <div key={channel.id} className="card-place">
                  <ChannelCard channel={channel} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
});

export default ChannelsLayout;
