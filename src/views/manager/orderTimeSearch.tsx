import {Button, DatePicker, Space, Table} from 'antd';
import React, { useState } from 'react';
import {listOrder} from "../../service/api/orderApi";

const { RangePicker } = DatePicker;

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
    }
];
const App: React.FC = () => {
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [dataSource, setDataSource] = useState<any[]>([]); // 设置初始类型为 any[]
    let pageNum = 1;
    let pageSize = 30;

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        setStartTime(dateStrings[0]);
        setEndTime(dateStrings[1]);
    };

    const click = () => {
        console.log(startTime, endTime);
        listOrder({
            pageNum: 1,
            pageSize: pageSize,
        })
            .then((res) => {
                console.log(res.data);
                const newData = [];
                for (let i = 0; i < res.data.data.records.length; i++) {
                    const recordDate = res.data.data.records[i].time;
                    // @ts-ignore
                    if (recordDate >= startTime && recordDate <= endTime) {
                        newData.push(res.data.data.records[i]);
                    }
                }
                console.log("data", newData);
                // @ts-ignore
                setDataSource(newData);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
            });
    };


    return (
        <div className='about'>
        <Space direction="vertical" size={12}>
            <RangePicker
                cellRender={(current) => {
                    const style: React.CSSProperties = {};
                    if (current.date() === 1) {
                        style.border = '1px solid #1677ff';
                        style.borderRadius = '50%';
                    }
                    return (
                        <div className="ant-picker-cell-inner" style={style}>
                            {current.date()}
                        </div>
                    );
                }}
                onChange={handleDateChange}
            />
            <Button type = "primary" onClick={click}> 确认时间 </Button>
        </Space>
    <Table dataSource={dataSource} columns={columns} />
</div>
    );
};

export default App;
