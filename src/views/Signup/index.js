import React,{Component} from "react";
import {Typography, Button, Space, Divider, Input, message, Row, Col} from 'antd';
import {connect} from "react-redux";
import {addUser} from "../../service/api/userApi";
import {addUserAuth, registerUserAuth} from "../../service/api/userAuthApi";
import {loginUserAuth} from "../../service/api/userAuthApi";

let param={
    username:"",
    email:"",
    password: "",
    passwordConfirmation:""
}

class Register extends Component{

    constructor() {
        super();
        this.state={
            username:"",
            email:"",
            password:"",
            passwordConfirmation:""
        }
    }


    changeHandle= (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log((e.target.name))
        if(e.target.name==="username")
        {
            param.username=e.target.value;
        }
        else if(e.target.name==="email")
        {
            param.email=e.target.value;
        }
        else if(e.target.name==="password")
        {
            param.password=e.target.value;
        }
        else if(e.target.name==="passwordConfirmation")
        {
            param.passwordConfirmation=e.target.value;
        }
    }

    handleSubmit=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(param.email)) {
            message.warning('邮箱格式不正确');
            return;
        }
        else if(param.password!==param.passwordConfirmation){
            message.warning('两次输入密码不一致');
            return;
        }
        registerUserAuth(param).then(res =>{
            if(res.data===0)
            message.warning("该用户名已有人注册")
        else {
        if(param.password===param.passwordConfirmation) {
            message.warning("注册成功");
            addUserAuth(param).then(res => {
                console.log((res.data))
            })
            window.location.href = '/login';
        }
        else{
            message.warning("两次输入密码不相同")
        }
    }
    })
    }

    render() {
        const onsubmit = async e=>{
            e.preventDefault();
          const{data}=await this.props.registerFn.registerAc(this.state);
        console.log(data);
        };
        const {username,email,password,passwordConfirmation}=this.state;
        return (
            <div className="login-container">
                <Row justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                        <form onSubmit={this.onSubmit}>
                            <h1>Join our community</h1>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <div className="form-group">
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <label htmlFor="usernameInput" className="control-label">Username</label>
                                    </Space>
                                    <Input style={{
                                        width: 300,
                                    }}
                                           type="test"
                                           name="username"
                                           value={username}
                                           onChange={this.changeHandle}
                                    />
                                </div>

                                <div className="form-group">
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <label htmlFor="emailInput" className="control-label">Email</label>
                                    </Space>

                                    <Input style={{
                                        width: 300,
                                    }}
                                           type="email"
                                           name="email"
                                           value={email}
                                           onChange={this.changeHandle}
                                    />
                                </div>

                                <div className="form-group">
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <label htmlFor="passwordInput" className="control-label">Password</label>
                                    </Space>
                                    <Input style={{
                                        width: 300,
                                    }}
                                           type="password"
                                           name="password"
                                           value={password}
                                           onChange={this.changeHandle}
                                    />
                                </div>

                                <div className="form-group">
                                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                        <label htmlFor="passwordConfirmationInput"className="control-label">passwordConfirmation</label>
                                    </Space>
                                    <Input style={{
                                        width: 300,
                                    }}
                                           type="password"
                                           name="passwordConfirmation"
                                           value={passwordConfirmation}
                                           onChange={this.changeHandle}
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
