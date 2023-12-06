import React, { useState } from "react";
import {Button, Card, Divider} from "antd";
import Search from "antd/es/input/Search";
import Title from "antd/es/skeleton/Title";

const View = () => {
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [message, setMessage] = useState("");

    const fetchBookAuthor = () => {
        fetch(`http://localhost:8081/microservice/getBookAuthorByName/${bookName}`)
            .then((response) => {
                if (!response.ok) {
                    setMessage("Failed to fetch data");
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.code === "true") {
                    setBookAuthor(data.data.bookAuthor);
                    setMessage(data.message);
                } else {
                    setMessage("Failed to retrieve book author");
                }
            })
            .catch((error) => {
                setMessage("An error occurred");
                console.error(error);
            });
    };

    const cardStyle = {
        width: '800px', /* 设置卡片宽度 */
        margin: '0 auto', /* 水平居中 */
        border: '1px solid #ccc', /* 可选：添加边框 */
        padding: '20px', /* 可选：添加内边距 */
    };


    return (
        <div>
            <Card style={cardStyle}>
            <h1 >Book Author Lookup</h1>
                <Divider />
                <p>微服务：按照书名查找作者</p>
                <Search
                    style={{ width: '300px' }}
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={fetchBookAuthor}
                />
                <Divider/>
            {bookAuthor && (
                <Card title="查询结果"  style={{ width: 300 ,margin: '0 auto', /* 水平居中 */ }}>
                <p>{message}</p>
                <p>Book Name: {bookName}</p>
                <p>Book Author: {bookAuthor}</p>
                </Card>
            )}
            </Card>
        </div>
    );
};

export default View;
