import { observer } from 'mobx-react-lite';
import { IProgram } from '../api/models';
import { Button, Progress, Rate, message } from 'antd';
import { useStores } from '../hooks/useStores';
import { FileAddOutlined } from '@ant-design/icons';
import { useState } from 'react';

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
            <div
                className='programm-card'
                style={{
                    backgroundImage: `url(${program.image})`,
                }}
            >
                <div className='programm-card__info'>
                    <div className='info__percent'>
                        {(stream && date > new Date(stream.start)) ??
                        date < new Date(stream?.finish as string) ? (
                            <Progress
                                percent={
                                    (date.getTime() - new Date(stream?.start as string).getTime()) /
                                    (new Date(stream?.finish as string).getTime() -
                                        new Date(stream?.start as string).getTime())
                                }
                            />
                        ) : null}
                    </div>
                    <div className='info__name d-flex' style={{ justifyContent: 'space-between' }}>
                        <div>
                            <h1>{program.name}</h1>
                        </div>

                        <div>
                            В избранное
                            <Button
                                style={{
                                    marginLeft: 10,
                                    backgroundColor: isFavorite ? '#4BB543' : '#ebedf5',
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
                                icon={<FileAddOutlined />}
                            />
                        </div>
                    </div>
                    <p className='info__rate'>
                        <Rate
                            allowHalf
                            defaultValue={program.rating}
                            onChange={(value: number) =>
                                rootStore
                                    .postProgramRating(value, program.id)
                                    .then(() => {
                                        messageApi.success('Отзыв добавлен');
                                    })
                                    .catch(() => {
                                        messageApi.error('Ошибка добавления отзыва');
                                    })
                            }
                        />
                    </p>
                    <div className='info__classify'>
                        <span className='info__kategory'>{program.category}</span>
                        <span className='info__genre'>{program.genre}</span>
                    </div>
                </div>
            </div>
        </>
    ) : null;
});

export default ProgrammCard;
