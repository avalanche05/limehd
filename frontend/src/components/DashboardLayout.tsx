import { Outlet } from 'react-router-dom';
import SideChannels from './SideChannels';
import Header from './Header';
import { Content } from 'antd/es/layout/layout';

const DashboardLayout: React.FC = () => {
    return (
        <>
            <Header />

            <div className='d-flex'>
                <SideChannels />

                <Content>
                    <Outlet></Outlet>
                </Content>
            </div>
        </>
    );
};

export default DashboardLayout;
