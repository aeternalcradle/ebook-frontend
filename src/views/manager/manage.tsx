import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import{Outlet,useNavigate}from "react-router-dom"
import MainMenu from "../../Components/ManagerMenu";
const { Header, Content, Footer, Sider } = Layout;
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <MainMenu></MainMenu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <Breadcrumb style={{ margin: '16px 32px' }}>
                        <Breadcrumb.Item>Bookstore Manage System</Breadcrumb.Item>
                        <Breadcrumb.Item>otto</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '16px 16px ' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center',padding:0,lineHeight:'48px' }}>BOOKSTORE ©2023 Created by 啊米浴说的道理~</Footer>
            </Layout>
        </Layout>
    );
};

export default App;