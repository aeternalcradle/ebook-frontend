import React, { useEffect, useState } from 'react';
import { Carousel, Input, message, Space } from 'antd';
import { Card, Col, Row } from 'antd';
import {Link, useParams} from 'react-router-dom';

const { Meta } = Card;


const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const BookDisplayPage: React.FC = () => {
    const { bookTag } = useParams(); // 提取URL参数
    const [pageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        updateList();
    }, [pageNum, pageSize]);

    const updateList = async () => {
        const response = await fetch(`http://localhost:8080/book/getBookByTags/${bookTag}`);
        const data = await response.json();
        console.log(data);

        setDataSource(data.data);

    };



    return (
        <div className='about'>

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
