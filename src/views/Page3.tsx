import React from 'react';
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
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
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