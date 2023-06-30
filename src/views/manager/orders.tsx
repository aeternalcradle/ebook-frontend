import React, { useState, useEffect } from 'react';
import {Typography, Input, Space, Table, Modal, Form, Button, message} from 'antd';
import { listOrder } from "../../service/api/orderApi";

const { Column } = Table;
const { Title } = Typography;
const { Search } = Input;

const View = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    let xid :any;

    useEffect(() => {
        updateList(pageNum, pageSize);
    }, [pageNum, pageSize]);

    const updateList = (page: number, pageSize: number) => {
        console.log('update list');
        listOrder({
            pageNum: page,
            pageSize: pageSize,
        }).then(res => {
            console.log(res.data);
            setDataSource(res.data.data.records);
            setTotal(res.data.data.total);
            setPageNum(res.data.data.current);
        });
    };
    const onSearch = (value: string) => {
        console.log(value);
    };
    const handleSearch = (value: string) => {
        let count=0;
        for(let i=0;dataSource[i]!=null;i++)
        {
            // @ts-ignore
            if(dataSource[i].name===value)
            { // @ts-ignore
                console.log(dataSource[i].bookId);
                count++;
                // @ts-ignore
                window.location.href = `http://localhost:3000/manage/ordertitlesearch/${dataSource[i].bookId}`;
            }
        }
        if(count==0){
            message.info('未查询到该订单')
        }
    };

    return (
        <div className='about'>
            <Title>Users Manage System</Title>
            <div className="wraper"><a href="/manage/ordertimesearch" rel="noreferrer">
                <Button type="primary" >按时间检索订单</Button>
            </a></div>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            <Table dataSource={dataSource}>
                <Column title="书籍名称" dataIndex="name" key="name" />
                <Column title="数目" dataIndex="num" key="num" />
                <Column title="价格" dataIndex="price" key="price" />
                <Column title="购买时间" dataIndex="time" key="time" />
            </Table>

        </div>
    );
};

export default View;
