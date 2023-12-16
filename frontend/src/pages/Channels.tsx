import { observer } from 'mobx-react-lite';
import Header from '../components/Header';
import SideChannels from '../components/sideChannels';
import ChannelsLayout from '../components/ChannelsLayout';

const Channels = observer(() => {
    return (
        <>
            <ChannelsLayout />
        </>
    );
});

export default Channels;
