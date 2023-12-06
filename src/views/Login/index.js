import React,{Component} from "react";
import {Typography, Button, Space, Divider, Input, message, Col, Row} from 'antd';
import {connect} from "react-redux";
import {addUser} from "../../service/api/userApi";
import {addUserAuth} from "../../service/api/userAuthApi";
import {loginUserAuth} from "../../service/api/userAuthApi";
import {Navigate, useNavigate} from "react-router-dom";


let param={
    username:"",
    password: "",
}


class Register extends Component{

    state = {
        loggedIn: false,
    };

    constructor() {
        super();
        this.state={
            username:"",
            password:"",
        }
    }

    handleSubmit=()=>{
        if(param.username==="")
        {
            message.warning("你必须输入用户名")
        }
        else if(param.password==="")
        {
            message.warning("您必须输入密码")
        }
        else{
            fetch("http://localhost:8080/userauth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(param),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Login failed");
                    }
                    return response.json(); // 解析响应体为 JSON
                })
                .then((data) => {
                    console.log((data))
                    if( data === 0)
                    {
                        message.warning("账号或者密码输入错误")

                    }
                    else if( data === 2)
                    {
                        message.warning("该账号已被禁用")
                    }
                    else{
                        message.success("登陆成功");
                        if(data === 3){
                            window.location.href = '/manage';
                            localStorage.setItem('username',param.username);
                        }
                        else{
                            this.setState({ loggedIn: true });
                            localStorage.setItem('username',param.username);}
                    }
                })
                .catch((error) => {
                    console.error("Login error: ", error);
                });
        }
    }


    changeHandle= (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log((e.target.value))
        if(e.target.name==="username")
        {
            param.username=e.target.value;
        }

        else if(e.target.name==="password")
        {
            param.password=e.target.value;
        }

    }



    render() {
        const { loggedIn } = this.state;
        if (loggedIn) {
            return <Navigate to="/page1" />;
        }
        const {username,password}=this.state;
        return (
            <div className="login-container">

                <Row justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                        <form onSubmit={this.onSubmit}>
                            <h1>Enter your password</h1>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <div className="form-group">
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <label className="control-label">Username</label>
                                    </Space>
                                    <Input style={{
                                        width: 300,
                                        height: 40,
                                    }}

                                           type="test"
                                           name="username"
                                           value={username}
                                           onChange={this.changeHandle}
                                           id="usernameInput" // 添加id属性
                                    />
                                </div>

                                <div className="form-group">
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <label className="control-label">Password</label>
                                    </Space>
                                    <Input style={{
                                        width: 300,
                                        height: 40,
                                    }}
                                           type="password"
                                           name="password"
                                           value={password}
                                           onChange={this.changeHandle}
                                           id="passwordInput" // 添加id属性
                                    />
                                </div>


                                <div className="form-group">
                                    <Button type="primary" onClick={this.handleSubmit}>Continue</Button>
                                    <Divider type="vertical" />
                                    <a href="/initial" rel="noreferrer">
                                        <Button type="primary" >Back</Button>
                                    </a>
                                </div>
                            </Space>
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Register;
