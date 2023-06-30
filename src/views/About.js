import {Button, Space, Table} from "antd";
import React from "react";
import {addPoi, deletePoi, editPoi, listPoi} from "../service/api/poiApi";

const handleList=()=>{
    console.log('handle list')
    listPoi(null).then(res =>{
        console.log((res.data))
    })
    updateList(pageNum,pageSize);
}

const handleDelete=()=>{
    console.log('handle delete')
    deletePoi(1).then(res =>{
        console.log((res.data))
    })
    updateList(pageNum,pageSize);
}
const handleAdd=()=>{
    console.log('handle add')
    let param={
        name:"数据结构",
        price:"88",
        num:"1",
    }
    addPoi(param).then(res =>{
        console.log((res.data))
    })
    updateList(pageNum,pageSize);
}
const handleEdit=()=>{
    console.log('handle click')
    let param={
        name:"高级数据结构"
    }
    editPoi(1,param).then(res =>{
        console.log((res.data))
    })

}

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key:'name'
    },
    {
        title: '价格',
        dataIndex: 'price',
        key:'price'
    },
    {
        title: '数目',
        dataIndex: 'num',
        key:'num'
    },
    {
        title: '操作',
        render: () => (
            <Space size="middle">
                <a onClick={handleEdit}>更改数目</a>
                <a onClick={handleDelete}>删除</a>
            </Space>
        ),
    },
];

let pageNum = 1;
let pageSize = 30;
let total = 0;
let dataSource = [];
const updateList=(page,pageSize)=>{
    console.log('update list')
    listPoi({
        pageNum:page,
        pageSize:pageSize,
    }).then(res =>{
        console.log((res.data))
        dataSource = res.data.data.records
        total = res.data.data.total
        pageNum = res.data.data.current
    })
}

updateList(pageNum,pageSize);
const test1 =()=>{
    console.log('test')
    updateList(pageNum,pageSize);
    console.log("test",dataSource[4])

}

const View = () =>{
    return (
        <div className='about'>
            <Button type="primary" onClick={handleList}>
                List
            </Button>
            <Button type="primary" onClick={handleDelete}>
                delete
            </Button>
            <Button type="primary" onClick={handleEdit}>
                edit
            </Button>
            <Button type="primary" onClick={handleAdd}>
                add
            </Button>
            <Button type="primary" onClick={test1}>
                test
            </Button>
            <Table dataSource={dataSource} columns={columns}  />



        </div>
    )
}
export default View