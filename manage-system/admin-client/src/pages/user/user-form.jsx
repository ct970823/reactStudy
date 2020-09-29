import React from 'react'
import PropTypes from "prop-types";
import {Form, Input,Select} from "antd";
const Item = Form.Item
const Option = Select.Option
export default class UserForm extends React.Component {
    formRef = React.createRef()
    static propTypes = {
        roles:PropTypes.array.isRequired,
        user:PropTypes.object.isRequired,
        setForm:PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.props.setForm(this.formRef)
    }


    render() {
        const {roles,user} = this.props
        return (
            <Form
                ref={this.formRef}
                key={new Date()}
                labelCol={{span:4}}
                labelAlign='right'
                initialValues={{
                    username:user.username,
                    password:user.password,
                    phone:user.phone,
                    email:user.email,
                    role_id:user.role_id
                }}
            >
                <Item
                    label='用户名'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message:'用户名不能为空'
                        }
                    ]}
                >
                    <Input placeholder="请输入用户名"/>
                </Item>
                {
                    user._id?null:(
                        <Item
                            label='密码'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message:'密码不能为空'
                                }
                            ]}
                        >
                            <Input type='password' placeholder="请输入密码"/>
                        </Item>
                    )
                }
                <Item
                    label='手机号'
                    name='phone'
                    rules={[
                        {
                            required: true,
                            message:'手机号不能为空'
                        },
                        {
                            pattern: /^1[23456789]\d{9}$/,
                            message:'手机号格式不正确'
                        }
                    ]}
                >
                    <Input placeholder="请输入手机号"/>
                </Item>
                <Item
                    label='邮箱'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message:'邮箱不能为空'
                        },
                        {
                            type: 'email',
                            message:'邮箱格式不正确'
                        }
                    ]}
                >
                    <Input placeholder="请输入邮箱"/>
                </Item>
                <Item
                    label='角色'
                    name='role_id'
                    rules={[
                        {
                            required: true,
                            message:'请选择角色'
                        }
                    ]}
                >
                    <Select placeholder="请选择角色">
                        {
                            roles.map(role=><Option value={role._id} key={role._id}>{role.name}</Option>)
                        }
                    </Select>
                </Item>
            </Form>
        )
    }
}