import React, { useState, useEffect } from 'react';
import { Typography, Input, Space, Table, Button, Modal, Form } from 'antd';
import {deleteOrder, detailOrder, editOrder, listOrder} from "../service/api/orderitemApi";
import {useParams} from "react-router-dom";
import {listBook} from "../service/api/bookApi";

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
    const { bookId } = useParams(); // 提取URL参数
    const [data,setData]=useState([]);

    detailOrder(bookId).then(res => {
        setData(res.data.data);
        // @ts-ignore
        xid=data.id;
    })

    useEffect(() => {
        updateList(pageNum, pageSize);
    }, [pageNum, pageSize]);

    const updateList = (page: number, pageSize: number) => {
        listOrder({
            pageNum: page,
            pageSize: pageSize,
        }).then(res => {
            const newData = [];
            for (let i = 0; i < res.data.data.records.length; i++) {
                console.log("1",res.data.data.records[i].bookId);
                if (res.data.data.records[i].bookId == bookId) {

                    newData.push(res.data.data.records[i]);
                }
            }
            console.log("data",newData)
            // @ts-ignore
            setDataSource(newData);
            setTotal(res.data.data.total);
            setPageNum(res.data.data.current);
        });
    };


    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className='about'>
            <Title>Order Search By Title</Title>
            <Table dataSource={dataSource}>
                <Column title="书籍标题" dataIndex="name" key="name" />
                <Column title="数目" dataIndex="num" key="num" />
                <Column title="价格" dataIndex="price" key="price" />
                <Column title="购买时间" dataIndex="time" key="time" />
            </Table>


        </div>
    );
};

export default View;
