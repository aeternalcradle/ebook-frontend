import React from 'react';
import { Typography,Button, Space ,Divider} from 'antd';

const { Title } = Typography;

const App: React.FC = () => (
    <>
        <Title>欢迎来到说的道理的线上书店</Title>
        <Divider/>
            <Title level={3}>已有帐户，请登录</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <a href="/login" rel="noreferrer">
                    <Button type="primary" >登录</Button>
                </a>
            <Title level={3}>暂无帐户，请注册</Title>
                <a href="/signup" rel="noreferrer">
                    <Button type="primary" >注册</Button>
                </a>
                <Title level={3}>管理员登录入口</Title>
                <a href="/managerlogin" rel="noreferrer">
                    <Button type="primary" >管理员登陆</Button>
                </a>
        </Space>
    </>


);

export default App;