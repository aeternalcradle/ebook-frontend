import React from "react";
import {message} from "antd";

const username=localStorage.getItem("username")
const userId = username; // 替换成要发送消息的用户ID
const serverUrl = `ws://localhost:8080/transfer/${userId}`;
const socket = new WebSocket(serverUrl);

socket.onopen = (event) => {
    console.log("WebSocket连接已建立");
    // 在连接建立后，可以发送消息给服务器
    const message = "Hello, Server!";
    socket.send(message);
};

socket.onmessage = (event) => {
    console.log(`收到服务器的消息: ${event.data}`);
    message.info(event.data);
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`WebSocket连接已关闭，关闭码: ${event.code}, 原因: ${event.reason}`);
    } else {
        console.error(`连接意外关闭`);
    }
};

socket.onerror = (error) => {
    console.error(`WebSocket发生错误: ${error.message}`);
};

const View = () => {
    return (
        <div>
        </div>
    );
};

export default View;
