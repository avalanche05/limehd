import { HeartOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { IProgram } from '../api/models';
import { useParams } from 'react-router-dom';
import { useStores } from '../hooks/useStores';
import { Button, Rate, Spin, message } from 'antd';

const Programm = observer(() => {
    const [program, setProgram] = useState<IProgram | null>(null);
    const { id } = useParams();
    const { rootStore } = useStores();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isFavorite, setIsFavorite] = useState(program?.is_favorite);

    useEffect(() => {
        setLoading(true);
        rootStore
            .fetchProgram(id ? +id : 1)
            .then((program): void => {
                setProgram(program);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [rootStore, id]);

    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <section className='programm'>
                    <img className='preview' src={program?.image} alt='' />
                    <h1 className='title'>Маша и Медведь</h1>
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
                            defaultValue={program?.rating}
                            onChange={(value: number) =>
                                rootStore
                                    .postProgramRating(value, program?.id || 1)
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
                                        .postProgramLike(program?.id || 1)
                                        .then(() => {
                                            if (!isFavorite) {
                                                messageApi.success('Канал добавлен в избранные');
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
                    <span className='category'>Категория: {program?.category}</span>
                    <span className='genre'>Жанр: {program?.genre}</span>

                    <p className='desc'>{program?.description}</p>
                </section>
            </Spin>
        </>
    );
});

export default Programm;
