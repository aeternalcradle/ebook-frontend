import React, { useState,useEffect } from 'react';
import { Breadcrumb, Layout, message, theme,Button } from 'antd';
import{Outlet,useNavigate}from "react-router-dom"
import MainMenu from "../Components/MainMenu";
import "../design/Home.css"
import {logoutUserAuth} from "../service/api/userAuthApi";
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    useEffect(() => {
        setUserId(localStorage.getItem('username'));
    }, []);
    const navigate = useNavigate();
    function handleLogout() {
        fetch("http://localhost:8080/userauth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Logout failed");
                }
                return response.text(); // 获取响应的字符串内容
            })
            .then((data) => {
                console.log("Logout successful. Response data:", data);
                // 在这里可以使用从后端返回的字符串数据 (data) 进行处理
                message.info( data ,)
                navigate("/initial")
            })
            .catch((error) => {
                console.error("Logout error: ", error);
            });
    }

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
                    <Breadcrumb.Item>Bookstore</Breadcrumb.Item>
                    <Breadcrumb.Item>otto</Breadcrumb.Item>
                    <div className="spacer" /> {/* 添加一个占位元素 */}
                    {userId && (
                        <Button type={"primary"} onClick={handleLogout}>Logout</Button>
                    )}
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
