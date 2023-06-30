import React, {useState} from 'react';
import { useParams } from 'react-router-dom'; // 导入 useParams
import { Button } from 'antd';
import { Table } from 'antd';
import { Collapse } from 'antd';
import { Typography } from 'antd';
import { Image } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { addPoi } from "../service/api/poiApi";
import { detailBook } from "../service/api/bookApi";


const View = () => {
    const [api, contextHolder] = notification.useNotification();
    const { bookId } = useParams(); // 提取URL参数
    const { Title } = Typography;
    const [dataSource, setDataSource] = useState([]);
    detailBook(bookId).then(res => {
        setDataSource(res.data.data);
    })
    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
        },
        {
            dataIndex: 'age',
            key: 'age',
        },
    ];
    const data = [
        {
            name: 'Title',
            age: dataSource.name,
        },
        {
            name: 'Author',
            age: dataSource.author,
        },
        {
            name: 'Publisher',
            age: dataSource.publisher,
        },
        {
            name: 'Price',
            age: dataSource.price,
        },
        {
            name: 'Status',
            age: 'out of stock',
        },
    ];
    const { Panel } = Collapse;

    const text = dataSource.description
;


    const Add = () => {
        api.open({
            message: 'SUCCEED',
            description: '成功将书籍加入购物车',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        console.log('handle add');
        let param = {
            name: dataSource.name,
            price: dataSource.price,
            num: "1",
            bookId : bookId
        };
        addPoi(param).then(res => {
            console.log(res.data);
        });
    };

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className='book2'>
            <div className="wraper">
                <div className="content">
                    <span>书籍详情页</span>
                </div>
                <a href="/page1" rel="noreferrer">
                    <Button type="primary">Back</Button>
                </a>
            </div>
            <div className="wraper">
                <Title>{dataSource.name}</Title>
            </div>
            <div className="book">
                <Image width={250} src={dataSource.coverUrl} alt="Cover"  />
                <Table columns={columns} dataSource={data} />;
            </div>
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="Introduction:">
                    <p>{text}</p>
                </Panel>
            </Collapse>
            <div className="button">
                {contextHolder}
                <Button type="primary" onClick={Add}>
                    Add to shopping cart
                </Button>
                <Button type="primary">Buy now</Button>

            </div>
        </div>
    );
};

export default View;
