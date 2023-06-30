import React from 'react';
import { Button } from 'antd';
import { Table} from 'antd';
import { Collapse } from 'antd';
import "./book.css";
import { Typography } from 'antd';
import { Image } from 'antd';
import book2 from "../../resources/book4.jpg"
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
        age: '我想和你谈谈精神病人的世界',
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
        age: '79',
    },
    {
        title: 'Status',
        age: 'out of stock',
    },
];
const { Panel } = Collapse;

const text = `这是一位“资深病友”写给与病同行之人的说明书。书中集结了作者和病友们的亲身体验，带读者去“精神病人的世界”一探究竟。作者用真诚、亲切、细腻的笔触，讲述了真实的患病经历，也告诉人们如何带着疾病积极生活。

本书收录了抑郁症、精神分裂症、人格障碍患者们对患病体验巨细无遗的讲述，更深入探讨了病患在实际生活中需要花时间面对及克服的课题。比如，第一次去看精神科需要注意些什么，如何跟身边的亲友坦白自己的病情，如何看待药物，如何有效与医生对话并制定治疗策略，如何处理工作、学业、财务、恋爱问题等。有了这样一本贴心的指南，精神病人的世界将不再冰冷和孤独
 

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
            name:"我想和你谈谈精神病人的世界",
            price:"79",
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
                <Title>我想和你谈谈精神病人的世界</Title>
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