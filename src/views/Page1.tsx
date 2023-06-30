import React, { useEffect, useState } from 'react';
import { Carousel, Input, message, Space } from 'antd';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ca1 from "../resources/1 (1).jpg";
import ca2 from "../resources/1 (2).jpg";
import ca3 from "../resources/1 (3).jpg";
import ca4 from "../resources/1 (4).jpg";
import csapp from "../resources/csapp.png";
import { listBook } from "../service/api/bookApi";

const { Meta } = Card;
const { Search } = Input;

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const BookDisplayPage: React.FC = () => {
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

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
                    //第一个修改处
                    // @ts-ignore
                    window.location.href = `http://localhost:3000/bookdetail/${dataSource[i].id}`;
                }
        }
        if(count==0){
         //第二个修改处
            message.info('未查询到该书籍')
        }
    };

    return (
        <div className='about'>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            <p> </p>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}><img alt="example" src={ca1} style={{ width: '100%', height: 'auto' }} /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img alt="example" src={ca2} style={{ width: '100%', height: 'auto' }} /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img alt="example" src={ca3} style={{ width: '100%', height: 'auto' }} /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><img alt="example" src={ca4} style={{ width: '100%', height: 'auto' }} /></h3>
                </div>
            </Carousel>

            <p> </p>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row gutter={16}>
                    {(searchResults.length > 0 ? searchResults : dataSource).map((record: any) => (
                        <Col span={6} key={record.id}>
                            <Link to={`/bookdetail/${record.id}`}>
                                <Card
                                    hoverable
                                    style={{ width: 240, height: 450 }}
                                    cover={<img alt="Cover" src={record.coverUrl} />}
                                >
                                    <Meta title={record.name} description={`${record.price}元`} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Space>
        </div>
    );
};

export default BookDisplayPage;
