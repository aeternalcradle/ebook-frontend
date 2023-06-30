import React from 'react';
import { Button } from 'antd';
import { Table} from 'antd';
import { Collapse } from 'antd';
import "./book.css";
import { Typography } from 'antd';
import { Image } from 'antd';
import book2 from "../../resources/book3.jpg"
import {useSelector,useDispatch} from "react-redux"
import store from "../../service/store";
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import {addPoi} from "../../service/api/poiApi";
const { Title } = Typography;
const columns = [
    {

        dataIndex: 'title',
        key: 'title',

    },
    {
        dataIndex: 'age',
        key: 'age',
    },

];
const data = [
    {
        title: 'Title',
        age: '流动不居',
    },
    {
        title: 'Author',
        age: '好像不是我',

    },
    {
        title: 'Publisher',
        age: '我不道啊',
    },
    {
        title: 'Price',
        age: '59',
    },
    {
        title: 'Status',
        age: 'out of stock',
    },
];
const { Panel } = Collapse;

const text = `
 20世纪早期，艺术及艺术体制在民主与平等的新精神之下受到批评。艺术作品是神圣之物，这一观点遭到公然反对，随后艺术作品被理解为只不过是物品。这是对现实主义的一种攻击，也是对博物馆传统的保护性使命的攻击。备受赞誉的艺术理论家鲍里斯•格罗伊斯认为，这种情况导致了“直接现实主义”的发展：这种艺术不生产物品，而生产不会留存下来的实践（从行为艺术到关系美学）。但一个多世纪过去了，这个方向上的每一次进步都迅速带来了保存艺术独特性的新方法。
在这部重要的著作中，格罗伊斯描绘了这种张力产生的悖论，探索了无物品媒介（互联网）时代的艺术。格罗伊斯断言，如果说机械复制给了我们没有灵晕的物品，那么数字复制生成的便是没有物品的灵晕，其所有物质性都转化成当下之短暂易逝的标志。


`;
const View = () =>{
    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch()

    const changeNum3= () =>{
        api.open({
            message: 'SUCCEED',
            description:
                '成功将书籍加入购物车',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        console.log('handle add')
        let param={
            name:"流动不居",
            price:"59",
            num:"1",
        }
        addPoi(param).then(res =>{
            console.log((res.data))
        })
    }
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
                    <Button type="primary" >Back</Button>
                </a>
            </div>
            <div className="wraper">
                <Title>流动不居</Title>
            </div>
            <div className="book">
                <Image
                    width={200}
                    src={book2}
                />
                <Table columns={columns} dataSource={data} />;
            </div>
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="Introduction:" >
                    <p>{text}</p>
                </Panel>

            </Collapse>
            <div className="button">
                {contextHolder}
                <Button type="primary" onClick={changeNum3}>Add to shopping cart</Button>
                <Button type="primary" >Buy now</Button>
            </div>

        </div>


    )};

export default View;