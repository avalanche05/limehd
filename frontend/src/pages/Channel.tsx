import { HeartOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IChannel } from '../api/models';
import { useStores } from '../hooks/useStores';
import { Button, Rate, Spin, message } from 'antd';
import { convertOneDigitStringToTwoDigits } from '../utils/convertDigits';

const Channel = observer(() => {
    const [channel, setChannel] = useState<IChannel | null>(null);
    const { id } = useParams();
    const { rootStore } = useStores();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isFavorite, setIsFavorite] = useState(channel?.is_favorite);

    useEffect(() => {
        setLoading(true);
        rootStore
            .fetchChannel(id ? +id : 1)
            .then((channel): void => {
                setChannel(channel);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [rootStore, id]);

    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <section className='channel'>
                    <div className='container channel-container'>
                        <div className='channel-data'>
                            <div className='channel-logo'>
                                <img src={channel?.image} alt='channel image' />
                            </div>
                            <div className='channel-info'>
                                <h1 className='name'>{channel?.name}</h1>
                                <p className='desc'>{channel?.description}</p>
                            </div>
                        </div>
                        <div
                            className='d-flex'
                            style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 7,
                            }}
                        >
                            <Rate
                                style={{ color: '#DAED6D' }}
                                allowHalf
                                defaultValue={channel?.rating}
                                onChange={(value: number) =>
                                    rootStore
                                        .postChannelRating(value, channel?.id || 1)
                                        .then(() => {
                                            messageApi.success('Отзыв добавлен');
                                        })
                                        .catch(() => {
                                            messageApi.error('Ошибка добавления отзыва');
                                        })
                                }
                            />

                            <div>
                                <Button
                                    style={{
                                        marginLeft: 10,
                                        backgroundColor: isFavorite ? '#DAED6D' : '#242424',
                                        color: isFavorite ? '#fff' : '#6b7683',
                                        border: 'none',
                                    }}
                                    type='default'
                                    shape='circle'
                                    onClick={() => {
                                        rootStore
                                            .postChannelLike(channel?.id || 1)
                                            .then(() => {
                                                if (!isFavorite) {
                                                    messageApi.success(
                                                        'Канал добавлен в избранные'
                                                    );
                                                } else {
                                                    messageApi.success('Канал удален из избранных');
                                                }

                                                setIsFavorite(!isFavorite);
                                            })
                                            .catch(() => {
                                                messageApi.error(
                                                    'Ошибка добавления канала в избранное'
                                                );
                                            });
                                    }}
                                    icon={<HeartOutlined />}
                                />
                            </div>
                        </div>
                        <div className='schedule'>
                            <div className='channel-schedule'>
                                <span className='schedule-title'>Расписание</span>
                                <div className='schedule-list'>
                                    {channel?.schedule.map((schedule, i) => {
                                        return (
                                            <div key={i} className='tvshow'>
                                                <div className='time'>
                                                    {' '}
                                                    {new Date(schedule.start).getHours()}:
                                                    {convertOneDigitStringToTwoDigits(
                                                        new Date(schedule.start).getMinutes()
                                                    )}
                                                    -{new Date(schedule.finish).getHours()}:
                                                    {convertOneDigitStringToTwoDigits(
                                                        new Date(schedule.finish).getMinutes()
                                                    )}
                                                </div>
                                                <div className='name'>{schedule.program.name}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Spin>
        </>
    );
});

export default Channel;
