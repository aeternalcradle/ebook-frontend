import React, { useState, useEffect } from 'react';
import {Typography, Input, Space, Table, Form, Button, Modal} from 'antd';
import {deleteUserAuth, editUserAuth, listUserAuth} from "../../service/api/userAuthApi";
import {editBook} from "../../service/api/bookApi";
import {editUser} from "../../service/api/userApi";

const { Column } = Table;
const { Title } = Typography;
const { Search } = Input;
let xid : any;
const View = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        updateList(pageNum, pageSize);
    }, [pageNum, pageSize]);

    const updateList = (page: number, pageSize: number) => {
        console.log('update list');
        listUserAuth({
            pageNum: page,
            pageSize: pageSize,
        }).then(res => {
            console.log(res.data);
            setDataSource(res.data.data.records);
            setTotal(res.data.data.total);
            setPageNum(res.data.data.current);
        });
    };

    const handleDelete = (id: any) => {
        console.log('handle delete');
        deleteUserAuth(id).then(res => {
            console.log(res.data);
        });
    };


    const showModal = () => {
        setVisible(true);
    };

    const handleEdit = (id: any) => {
        showModal();
        xid = id;
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onSearch = (value: string) => {
        console.log(value);
    };
    const handleFinish = (values: any) => {
        console.log('Received values:', values);
        const param = {
            username: values.name,
            password: values.password,
            email: values.email,
            managerPassword: values.managerPassword,
            banId: values.banId,
        };
        console.log(param);
        console.log("mani",xid);
        editUserAuth(xid, param).then(res => {
            console.log(res.data);
        });

        handleCancel();
    };

    return (
        <div className='about'>
            <Title>Users Manage System</Title>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Table dataSource={dataSource}>
                <Column title="用户昵称" dataIndex="username" key="username" />
                <Column title="用户邮箱" dataIndex="email" key="email" />
                <Column title="用户密码" dataIndex="password" key="password" />
                <Column title="管理员密码" dataIndex="managerPassword" key="managerPassword" />
                <Column title="是否禁用" dataIndex="banId" key="banId" />
                <Column
                    title="操作"
                    key="action"
                    render={(_: any, record: any) => (
                        <Space size="middle">
                            <a onClick={() => { handleEdit(record.id) }}>更改用户信息</a>
                            <a onClick={() => { handleDelete(record.id) }}>删除用户</a>
                        </Space>

                    )}
                />
            </Table>

            <Modal
                visible={visible}
                title="编辑用户信息"
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item name="name" label="用户昵称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="用户邮箱">
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="用户密码">
                        <Input />
                    </Form.Item>
                    <Form.Item name="managerPassword" label="管理员密码">
                        <Input />
                    </Form.Item>
                    <Form.Item name="banId" label="是否禁用">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default View;
