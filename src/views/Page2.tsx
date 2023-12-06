import React, { useState, useEffect } from 'react';
import {Typography, Input, Space, Table, Button, notification, Form, Modal,Select} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import {deletePoi, editPoi, listPoi} from '../service/api/poiApi';
const { Column } = Table;
const { Title } = Typography;
const { Search } = Input;
const username = localStorage.getItem("username");
let xid:any;
let socket: WebSocket | null = null; // 添加 WebSocket 连接对象
const onSearch = (value: string) => console.log(value);

const View = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // @ts-ignore
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // @ts-ignore
    const day = String(currentDate.getDate()).padStart(2, '0');

    const dDate = `${year}-${month}-${day}`;

    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState<any[]>([]); // 设置初始类型为 any[]
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    useEffect(() => {
        updateList(pageNum, pageSize);

    }, []);


    let pageNum = 1;
    let pageSize = 30;
    let total = 0;



    const updateList = (page: number, pageSize: number) => {
        console.log('update list');
        listPoi({
            pageNum: page,
            pageSize: pageSize,
        })
            .then((res) => {
                console.log(res.data);
                setDataSource(res.data.data.records);
                total = res.data.data.total;
                pageNum = res.data.data.current;
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
            });
    };

    const handleDelete = (id: any) => {
        console.log('handle delete');
        deletePoi(id)
            .then((res) => {
                console.log(res.data);
                updateList(pageNum, pageSize);
            })
            .catch((error) => {
                console.error('Failed to delete item:', error);
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

    const handleFinish = (values: any) => {
        console.log('Received values:', values);
        const param = {
            num: values.num,
        };
        console.log(param);
        editPoi(xid, param).then(res => {
            console.log(res.data);
        });
        handleCancel();
    };
    const openNotification = () => {
        api.open({
            message: 'SUCCEED',
            description: '您已成功下订单',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        let i = 0,
            j = 0;
        const paramArray = [];
        const param0 = {
            id: 1,
        };
        const param = {
            id: 1,
            name: String,
            price: 1,
            num: 1,
            orderId: 1,
        };
        const param1 = {
            name: String,
            price: 1,
            num: 1,
            orderId: 1,
            bookId: 1,
            username: username,
            time: '',
        };
        const param2={
            num: 1,
        }
        param0.id = dataSource[0].id;
        j = param0.id;
        if (j < 0) j = -j;

        while (dataSource[i] != null) {
            param.id = dataSource[i].id;
            param1.name = dataSource[i].name;
            param1.num = dataSource[i].num;
            param2.num = dataSource[i].num;
            param1.price = dataSource[i].price;
            param1.bookId=dataSource[i].bookId;
            param1.time=dDate;
            param1.orderId = j;
            paramArray.push({ ...param1 });
            i = i + 1;
        }
        fetch('http://localhost:8080/orderitem/order-set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramArray), // 将数据转换为 JSON 格式并发送
        })


        updateList(1, 30);
    };



    return (
        <div className='about'>
            <Title>My Shopping Cart</Title>

            <Search
                allowClear
                enterButton='Search'
                size='large'
                onSearch={onSearch}
            />
            <Table dataSource={dataSource}>
                <Column title='标题' dataIndex='name' key='name' />
                <Column title='价格' dataIndex='price' key='price' />
                <Column title='数目' dataIndex='num' key='num' />
                <Column
                    title='操作'
                    key='action'
                    render={(_: any, record: any) => (
                        <Space size='middle'>
                            <a onClick={() => handleEdit(record.id)}>更改数目</a>
                            <a onClick={() => handleDelete(record.id)}>从购物车中删除</a>
                        </Space>
                    )}
                />
            </Table>
            <Modal
                visible={visible}
                title="编辑书籍信息"
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item name="num" label="数目">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </Modal>
            {contextHolder}
            <Button type='primary' onClick={openNotification}>
                Buy
            </Button>
        </div>
    );
};

export default View;
