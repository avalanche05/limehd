import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStores } from '../hooks/useStores';
import { IChannel } from '../api/models';
import { Skeleton } from 'antd';

type Props = {
    channel: IChannel | null;
};

const SideChannelsItem = observer(({ channel }: Props) => {
    return (
        <>
            {channel ? (
                <a href={channel.stream_link} className='channel-item'>
                    <div
                        style={{ backgroundImage: `url(${channel.image})` }}
                        className='logo'
                    ></div>
                    <div className='info'>
                        <span className='name'>{channel.name}</span>
                        <span className='stream'>{channel.stream_link}</span>
                    </div>
                </a>
            ) : null}
        </>
    );
});

const SideChannels = observer(() => {
    const [isLoading, setIsLoading] = useState(false);
    const { rootStore } = useStores();

    useEffect(() => {
        setIsLoading(true);

        rootStore.fetchChannels().finally(() => {
            setIsLoading(false);
        });
    }, [rootStore]);

    return (
        <>
            <div className='sidenav'>
                <span className='header'>Каналы</span>

                {Array(16).map((_, index) => (
                    <div key={index} className='channel-item'>
                        <Skeleton loading={isLoading} />
                    </div>
                ))}

                {rootStore.channels.map((channel) => {
                    return <SideChannelsItem key={channel.id} channel={channel} />;
                })}
            </div>
            <div className='sidenav-thumb'></div>
        </>
    );
});

export default SideChannels;
