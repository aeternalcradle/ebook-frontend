import React, {useState,useEffect} from 'react';
import { Typography } from 'antd';
import { Form, Input, Button } from 'antd';
import type { FormItemProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Image } from 'antd';
const MyFormItemContext = React.createContext<(string | number)[]>([]);
const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
};
interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[];
    children: React.ReactNode;
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
};
const { Title } = Typography;
const View = () =>{
    const [base64Image, setBase64Image] = useState('');
    const username = localStorage.getItem("username");
    useEffect(() => {
        // Fetch the iconBase64 based on the username when the component mounts or when the username changes

        const fetchIconBase64 = async () => {
            try {
                const response = await fetch(`http://localhost:8080/person/getImage/${username}`);
                const data = await response.json(); // Assuming the response is in JSON format
                // Set the base64Image in the state
                console.log("12346",data.data);
                setBase64Image(data.data);
            } catch (error) {
                console.error('Error fetching iconBase64:', error);
            }
        };

        fetchIconBase64();
    }, [username]);


    const onFinish = (value: object) => {
        console.log(value);
    };
    return (
        <div className='about'>
            <Title>My Profile</Title>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <MyFormItemGroup prefix={['user']}>
                    <MyFormItemGroup prefix={['name']}>
                        <MyFormItem name="firstName" label="First Name">
                            <Input />
                        </MyFormItem>
                        <MyFormItem name="lastName" label="Last Name">
                            <Input />
                        </MyFormItem>
                    </MyFormItemGroup>
                    <MyFormItem name="twitter" label="twitter">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="avatar" label="avatar">
                        <Space direction="vertical" size={16}>
                            <Space wrap size={16}>
                                <Image
                                    width={200}
                                    src={base64Image} alt="Converted to Base64"     />
                            </Space>
                        </Space>
                    </MyFormItem>
                    <MyFormItem name="notes" label="notes">
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 120, resize: 'none' }}
                            onChange={onChange}
                            placeholder="disable resize"
                        />
                    </MyFormItem>
                </MyFormItemGroup>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}
export default View
