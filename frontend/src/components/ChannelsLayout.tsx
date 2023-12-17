import { observer } from 'mobx-react-lite';
import ChannelCard from './ChannelCard';
import { useStores } from '../hooks/useStores';
import { useEffect, useState } from 'react';
import { Segmented, Skeleton, message } from 'antd';
import { IChannel } from '../api/models';

const ChannelsLayout = observer(() => {
    const { rootStore } = useStores();
    const [isLoading, setIsLoading] = useState(false);
    const [channels, setChannels] = useState<IChannel[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const yesterdayStart = '2023-12-16T00:00:00.668Z';
    const yestardayFinish = '2023-12-16T23:59:59.668Z';

    const todayStart = '2023-12-17T00:00:00.668Z';
    const todayFinish = '2023-12-17T23:59:59.668Z';

    const tomorrowStart = '2023-12-18T00:00:00.668Z';
    const tomorrowFinish = '2023-12-18T23:59:59.668Z';

    const afterTomorrowStart = '2023-12-19T00:00:00.668Z';
    const afterTomorrowFinish = '2023-12-19T23:59:59.668Z';

    useEffect(() => {
        setIsLoading(true);

        rootStore
            .fetchChannels()
            .then((channels): void => {
                setChannels(channels);
            })
            .catch(() => {
                messageApi.error('Ошибка загрузки каналов');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [rootStore, messageApi]);

    return (
        <>
            {contextHolder}
            <section className='channels'>
                <Segmented
                    defaultValue={'Сегодня'}
                    onChange={(value) => {
                        switch (value) {
                            case 'Вчера':
                                setIsLoading(true);
                                rootStore
                                    .fetchChannels({
                                        start: yesterdayStart,
                                        finish: yestardayFinish,
                                    })
                                    .then((channels): void => {
                                        setChannels(channels);
                                    })
                                    .catch(() => {
                                        messageApi.error('Ошибка загрузки каналов');
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                    });
                                break;
                            case 'Сегодня':
                                setIsLoading(true);
                                rootStore
                                    .fetchChannels({
                                        start: todayStart,
                                        finish: todayFinish,
                                    })
                                    .then((channels): void => {
                                        setChannels(channels);
                                    })
                                    .catch(() => {
                                        messageApi.error('Ошибка загрузки каналов');
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                    });
                                break;
                            case 'Завтра':
                                setIsLoading(true);
                                rootStore
                                    .fetchChannels({
                                        start: tomorrowStart,
                                        finish: tomorrowFinish,
                                    })
                                    .then((channels): void => {
                                        setChannels(channels);
                                    })
                                    .catch(() => {
                                        messageApi.error('Ошибка загрузки каналов');
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                    });
                                break;
                            case 'Послезавтра':
                                setIsLoading(true);
                                rootStore
                                    .fetchChannels({
                                        start: afterTomorrowStart,
                                        finish: afterTomorrowFinish,
                                    })
                                    .then((channels): void => {
                                        setChannels(channels);
                                    })
                                    .catch(() => {
                                        messageApi.error('Ошибка загрузки каналов');
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                    });
                                break;

                            default:
                                break;
                        }
                    }}
                    options={['Вчера', 'Сегодня', 'Завтра', 'Послезавтра']}
                />

                {isLoading ? (
                    <div className='row' style={{ marginTop: 20 }}>
                        {Array(16)
                            .fill(null)
                            .map((_, index) => (
                                <div key={index} className='card-place'>
                                    <Skeleton loading={isLoading}></Skeleton>
                                </div>
                            ))}
                    </div>
                ) : null}

                {!isLoading ? (
                    <div style={{ marginTop: 20 }} className='container channels-container'>
                        <div className='row'>
                            {channels.map((channel) => {
                                return (
                                    <div key={channel.id} className='card-place'>
                                        <ChannelCard channel={channel} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </section>
        </>
    );
});

export default ChannelsLayout;
