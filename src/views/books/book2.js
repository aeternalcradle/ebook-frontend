import React from 'react';
import { Button } from 'antd';
import { Table} from 'antd';
import { Collapse } from 'antd';
import "./book.css";
import { Typography } from 'antd';
import { Image } from 'antd';
import book2 from "../../resources/book2.jpg"
import {useSelector,useDispatch} from "react-redux"
import store from "../../service/store";
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
        age: '现代国家的起源',
    },
    {
        name: 'Author',
        age: 'J.A.贝克',

    },
    {
        name: 'Publisher',
        age: '理想国',
    },
    {
        name: 'Price',
        age: '79',
    },
    {
        name: 'Status',
        age: 'out of stock',
    },
];
const { Panel } = Collapse;

const text = `
  ★绝版经典，全新回归。影响超过半个世纪的伟大杰作，自然文学巅峰之作。

——《游隼》出版于1967年，并获当年的达夫·库珀奖，是J.A.贝克一生仅有的两本著作之一。贝克自幼高度近视，患有严重类风湿性关节炎，一生不曾真正走出过出生地埃塞克斯。他自我放逐人世之外整整10年，将全部的生命和灵魂寄托于游隼，日复一日地搜寻、观察，记录下超过1600页的笔记，其后又反复修改、提炼，最终浓缩成这本时间跨度仅半年的日记，为自然文学留下了一本堪称典范的作品。这是20世纪60年代的冬季，也是所有的任何的冬季。

★坚定纯粹的灵魂守望，向死而生的永恒绝唱。关于一个人，渴望成为人以外的存在。

——对于罹患疾病、处处受限的贝克来说，自由翱翔于天际的游隼无疑是所有理想的化身。他一生隐姓埋名，对于人类的身份几近厌弃，在极尽克制的文字里，他穷尽所有想象走近世界的边缘，感受鹰的感受，为游隼也为自己留下一首凄美的挽歌，然后在病榻上默默度过余生，消失于世。这不是一本关于鸟的书，而是一本关于成为鸟的书。关于一个人，渴望成为人以外的存在。

★ 兼具纪录片的精确和散文诗的优美，真正走进作者内心才能完成的“不像译作的译作”。

——贝克用奇绝的比喻和恣意的笔法勾勒出10年间反复观察、描摹过的景象，用精确、凝练、充满诗意的语言生动还原了游隼停驻的这片冬天乡野上的每一种声音、每一抹色彩，乃至密度不一的空气质感，带给读者近乎观看纪录片的阅读感受，让读者仿佛接受了一场来自自然和文学的双重洗礼。译者李斯本读懂了作者那颗“寂静主义者的心”，面对他自由大胆的语言尝试，仔细斟酌，考究用词，消弭了语言的国界，完成了一次精彩的诠释。

★纽约书评“经典重现”书单选书，电影大师赫尔佐格指定必读作品，豆瓣2017年度外国文学Top2，豆瓣千人以上评分9.1分，名家好评不断

——贝克凭借此书被视为“新自然主义写作”的先驱，英国博物学作家理查德·梅比称其是“对所有后来者而言唯一最重要的启迪者”。著名导演沃纳·赫尔佐格称《游隼》是约瑟夫·康拉德水准的写作，将其列为无赖电影学院必读书之一，与其并列的是维吉尔和海明威的作品。英国桂冠诗人特德·休斯和当代最好的行走文学作家罗伯特·麦克法伦都将本书誉为“20世纪自然文学最重要的作品之一”。

`;
const View = () =>{
    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch()

    const changeNum2= () =>{
        api.open({
            message: 'SUCCEED',
            description:
                '成功将书籍加入购物车',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        console.log('handle add')
        let param={
            name:"现代国家的起源",
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
                <Title>现代国家的起源</Title>
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
                <Button type="primary" onClick={changeNum2}>Add to shopping cart</Button>
                <Button type="primary" >Buy now</Button>
            </div>

        </div>


)};

export default View;