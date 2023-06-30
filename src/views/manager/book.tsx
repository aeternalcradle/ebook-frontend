import React, { useState, useEffect } from 'react';
import {Typography, Input, Space, Table, Button, Modal, Form, message} from 'antd';
import { addBook, deleteBook, editBook, listBook } from "../../service/api/bookApi";

const { Column } = Table;
const { Title } = Typography;
const { Search } = Input;

let xid:any;

const View = () => {
    const [visible, setVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [form] = Form.useForm();
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        updateList(pageNum, pageSize);
    }, [pageNum, pageSize]);

    const updateList = (page: number, pageSize: number) => {
        console.log('update list');
        listBook({
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
        deleteBook(id).then(res => {
            console.log(res.data);
        });
    };

    const showModal = () => {
        setVisible(true);
    };

    const showAddModal = () => {
        setAddVisible(true);
    };

    const addNewBook = () => {
        showAddModal();
    };

    const handleEdit = (id: any) => {
        showModal();
        xid = id;
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleAddCancel = () => {
        setAddVisible(false);
    };

    const handleAddFinish = (values: any) => {
        console.log('Received values:', values);
        const param = {
            name: values.title,
            author: values.author,
            price: values.price,
            num: values.num,
            description: values.description,
            coverUrl: values.coverUrl,
        };
        console.log(param);
        addBook(param).then(res => {
            console.log(res.data);
        });

        handleAddCancel();
    };

    const handleFinish = (values: any) => {
        console.log('Received values:', values);
        const param = {
            name: values.title,
            author: values.author,
            price: values.price,
            num: values.num,
        };
        console.log(param);
        editBook(xid, param).then(res => {
            console.log(res.data);
        });

        handleCancel();
    };

    const handleSearch = (value: string) => {
        console.log("dd",dataSource);
        console.log("vv",value);
        let count=0;
        for(let i=0;dataSource[i]!=null;i++)
        {
            // @ts-ignore
            if(dataSource[i].name===value)
            { // @ts-ignore
                console.log(dataSource[i].id);
                count++;
                // @ts-ignore
                window.location.href = `http://localhost:3000/manage/booksearch/${dataSource[i].id}`;
            }
        }
        if(count==0){
            message.info('未查询到该书籍')
        }
    };

    return (
        <div className='about'>
            <Title>Book Manage System</Title>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            <Table dataSource={dataSource}>
                <Column
                    title="封面"
                    dataIndex="coverUrl"
                    key="coverUrl"
                    render={(coverUrl: string) => (
                        <img src={coverUrl} alt="Cover" style={{ width: '100px' }} />
                    )}
                />
                <Column title="书籍标题" dataIndex="name" key="name" />
                <Column title="作者" dataIndex="author" key="author" />
                <Column title="价格" dataIndex="price" key="price" />
                <Column title="IBSN编号" dataIndex="id" key="id" />
                <Column title="库存量" dataIndex="num" key="num" />
                <Column
                    title="操作"
                    key="action"
                    render={(_: any, record: any) => (
                        <Space size="middle">
                            <a onClick={() => { handleEdit(record.id) }}>更改书籍信息</a>
                            <a onClick={() => { handleDelete(record.id) }}>删除书籍</a>
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
                    <Form.Item name="coverUrl" label="封面的url">
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="书籍标题">
                        <Input />
                    </Form.Item>
                    <Form.Item name="author" label="作者">
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="价格">
                        <Input />
                    </Form.Item>
                    <Form.Item name="num" label="库存量">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Button type="primary" onClick={addNewBook}>
                添加一本新书
            </Button>
            <Modal
                visible={addVisible}
                onCancel={handleAddCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleAddFinish}>
                    <Form.Item name="coverUrl" label="封面的url">
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="书籍标题">
                        <Input />
                    </Form.Item>
                    <Form.Item name="author" label="作者">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="书籍描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="价格">
                        <Input />
                    </Form.Item>
                    <Form.Item name="num" label="库存量">
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
