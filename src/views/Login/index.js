import React,{Component} from "react";
import {Typography, Button, Space, Divider, Input, message} from 'antd';
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
        loginUserAuth(param).then(res =>{
            console.log((res.data))
            if( res.data === 0)
            {
                message.warning("账号或者密码输入错误")

            }
            else if( res.data === 2)
            {
                message.warning("该账号已被禁用")

            }
            else{
                message.success("登陆成功");
                this.setState({ loggedIn: true });
            }
        })}
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
                    <h1>Welcome</h1>
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
                            <Button className="btn btn-primary btn-lg" type="primary" onClick={this.handleSubmit}>登录</Button>
                        </div>
                    </Space>
                </form>
            </div>
        );
    }
}
export default Register;