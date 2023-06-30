import React,{Component} from "react";
import {Typography, Button, Space, Divider, Input, message} from 'antd';
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

        registerUserAuth(param).then(res =>{
            if(res.data===0)
            message.warning("该用户名已有人注册")
        else {
        if(param.password===param.passwordConfirmation) {
            message.warning("注册成功");
            addUserAuth(param).then(res => {
                console.log((res.data))
            })
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
            <div>

                <div className="wraper"><a href="/initial" rel="noreferrer">
                    <Button type="primary" >返回</Button>
                </a></div>

                <form onSubmit={this.onSubmit}>
                    <h1>Join our community</h1>
                    <Divider/>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <label className="control-label">Username</label>
                        </Space>
                    <Input style={{
                        width: 500,
                    }}
                        className="form-control"
                        type="test"
                        name="username"
                        value={username}
                        onChange={this.changeHandle}
                    />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label className="control-label">Email</label>
                        </Space>

                        <Input style={{
                            width: 500,
                        }}
                               className="form-control"
                               type="email"
                               name="email"
                               value={email}
                               onChange={this.changeHandle}
                        />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label className="control-label">Password</label>
                        </Space>
                        <Input style={{
                            width: 500,
                        }}
                               className="form-control"
                               type="password"
                               name="password"
                               value={password}
                               onChange={this.changeHandle}
                        />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label className="control-label">passwordConfirmation</label>
                        </Space>
                        <Input style={{
                            width: 500,
                        }}
                               className="form-control"
                               type="password"
                               name="passwordConfirmation"
                               value={passwordConfirmation}
                               onChange={this.changeHandle}
                        />

                    </div>
                        <div className="form-group">
                            <Button className="btn btn-primary btn-lg" type="primary" onClick={this.handleSubmit}>注册</Button>
                        </div>
                    </Space>
                </form>
            </div>
        );
    }
}
export default Register;