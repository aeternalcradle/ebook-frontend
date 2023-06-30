import React from 'react';
import { Button } from 'antd';
import { Table} from 'antd';
import { Collapse } from 'antd';
import "./book.css";
import { Typography } from 'antd';
import { Image } from 'antd';
import book2 from "../../resources/csapp.png"
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import {addPoi} from "../../service/api/poiApi";

const { Title } = Typography;
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
        age: '深入了解计算机系统',
    },
    {
        name: 'Author',
        age: '好像不是我',

    },
    {
        name: 'Publisher',
        age: '我不道啊',
    },
    {
        name: 'Price',
        age: '139',
    },
    {
        name: 'Status',
        age: 'out of stock',
    },
];
const { Panel } = Collapse;

const text = `
和第2版相比，本版内容上*大的变化是，从以IA32和x86-64为基础转变为完全以x86-64为基础。主要更新如下：
基于x86-64，大量地重写代码，首次介绍对处理浮点数据的程序的机器级支持。
处理器体系结构修改为支持64位字和操作的设计。
引入更多的功能单元和更复杂的控制逻辑，使基于程序数据流表示的程序性能模型预测更加可靠。
扩充关于用GOT和PLT创建与位置无关代码的讨论，描述了更加强大的链接技术（比如库打桩）。
增加了对信号处理程序更细致的描述，包括异步信号安全的函数等。
采用新函数，更新了与协议无关和线程安全的网络编程

`;
const View = () =>{
    const [api, contextHolder] = notification.useNotification();


    const Add= () =>{
        api.open({
            message: 'SUCCEED',
            description:
                '成功将书籍加入购物车',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        console.log('handle add')
        let param={
            name:"深入了解计算机系统",
            price:"139",
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
                <Title>深入了解计算机系统</Title>
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
                <Button type="primary" onClick={Add}>Add to shopping cart</Button>
                <Button type="primary" >Buy now</Button>
            </div>

        </div>


    )};

export default View;