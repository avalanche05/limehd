import { observer } from 'mobx-react-lite';
import { IChannel } from '../api/models';

type Props = {
    channel: IChannel | null;
};

const ChannelCard = observer(({ channel }: Props) => {
    return (
        <>
            {channel ? (
                <div className='channel-card'>
                    <div className='prev'>
                        <img className='channel-logo' src={channel.image} alt='Channel Logo' />
                        <span className='name'>{channel.name}</span>
                    </div>
                    <div className='schedule'>
                        <div className='schedule-item'>
                            <div className='time'>{channel.name}</div>
                            <div className='tvshow-name'>
                                Кубок Первого канала по хоккею-2023. Прямая трансляция из
                                Санкт-Петербурга. Сборная России - сборная Белоруссии
                            </div>
                        </div>
                        <div className='schedule-item'>
                            <div className='time'>19:30</div>
                            <div className='tvshow-name'>Вечерние новости (с субтитрами)</div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
});

export default ChannelCard;
