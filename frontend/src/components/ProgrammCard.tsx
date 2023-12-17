import { observer } from 'mobx-react-lite';
import { IProgram } from '../api/models';
import { Button, Progress, Rate, message } from 'antd';
import { useStores } from '../hooks/useStores';
import { HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { convertOneDigitStringToTwoDigits } from '../utils/convertDigits';

type Props = {
    program: IProgram | null;
};

const ProgrammCard = observer(({ program }: Props) => {
    const { rootStore } = useStores();
    const [messageApi, contextHolder] = message.useMessage();
    const date = new Date();
    const [isFavorite, setIsFavorite] = useState(program?.is_favorite);

    const stream = program?.streams[0];

    return program ? (
        <>
            {contextHolder}
            <Link to={`/dashboard/program/${program.id}`}>
                <div
                    className='programm-card'
                    style={{
                        backgroundImage: `url(${program.image})`,
                        color: '#fff',
                        textDecoration: 'none',
                    }}
                >
                    <div className='programm-card__info'>
                        <div
                            className='info__name d-flex'
                            style={{ justifyContent: 'space-between' }}
                        >
                            <div className='programm-name-box'>
                                <h1 className='programm-name'>{program.name}</h1>
                            </div>

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
                                            .postChannelLike(program.id)
                                            .then(() => {
                                                if (!isFavorite) {
                                                    messageApi.success(
                                                        'Отделение добавлено в избранные'
                                                    );
                                                } else {
                                                    messageApi.success(
                                                        'Отделение удалено из избранных'
                                                    );
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
                        <div className='info__classify'>
                            <span className='info__kategory'>{program.category}</span>
                            <span className='info__genre'>{program.genre}</span>
                        </div>
                        <p className='info__rate'>
                            <Rate
                                style={{ color: '#DAED6D' }}
                                allowHalf
                                defaultValue={program.rating}
                                onChange={(value: number) =>
                                    rootStore
                                        .postProgramRating(program.id, value)
                                        .then(() => {
                                            messageApi.success('Отзыв добавлен');
                                        })
                                        .catch(() => {
                                            messageApi.error('Ошибка добавления отзыва');
                                        })
                                }
                            />
                        </p>
                        {program.streams.length > 0 ? (
                            <div style={{ marginTop: 7 }}>
                                <span className='info__genre'>
                                    {new Date(program.streams[0].start).getHours()}:
                                    {convertOneDigitStringToTwoDigits(
                                        new Date(program.streams[0].start).getMinutes()
                                    )}
                                    -{new Date(program.streams[0].finish).getHours()}:
                                    {convertOneDigitStringToTwoDigits(
                                        new Date(program.streams[0].finish).getMinutes()
                                    )}
                                </span>
                            </div>
                        ) : null}
                        <div className='info__percent'>
                            {(stream && date > new Date(stream.start)) ??
                            date < new Date(stream?.finish as string) ? (
                                <Progress
                                    percent={
                                        Math.round(
                                            date.getTime() -
                                                new Date(stream?.start as string).getTime()
                                        ) /
                                        (new Date(stream?.finish as string).getTime() -
                                            new Date(stream?.start as string).getTime())
                                    }
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    ) : null;
});

export default ProgrammCard;
