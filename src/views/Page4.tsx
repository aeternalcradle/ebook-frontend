import React, { useState, useEffect } from 'react';
import {Typography, Table, Input, message, Button} from 'antd';
import { listOrder,editOrder } from '../service/api/orderApi';

const { Title } = Typography;

function handleEdit() {
    
}
const { Search } = Input;

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '订单编号',
        dataIndex: 'pid',
        key: 'pid',
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '数目',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: '下订单的时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '操作',
        render: () => (

                <a onClick={handleEdit}>申请退款</a>

        ),
    },
];

const View = () => {
    const [dataSource, setDataSource] = useState<any[]>([]); // 设置初始类型为 any[]

    useEffect(() => {
        updateList(pageNum, pageSize);
    }, []); // 空的依赖项列表，表示只在组件挂载时执行一次

    let pageNum = 1;
    let pageSize = 30;

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
                window.location.href = `http://localhost:3000/ordertitlesearch/${dataSource[i].bookId}`;
            }
        }
        if(count==0){
            message.info('未查询到该订单')
        }
    };
    const updateList = (page: number, pageSize: number) => {
        console.log('update list');
        listOrder({
            pageNum: page,
            pageSize: pageSize,
        })
            .then((res) => {
                console.log(res.data);
                setDataSource(res.data.data.records);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
            });
    };


    return (
        <div className='about'>
            <Title>My Orders</Title>
            <div className="wraper"><a href="/ordertimesearch" rel="noreferrer">
                <Button type="primary" >按时间检索订单</Button>
            </a></div>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default View;
