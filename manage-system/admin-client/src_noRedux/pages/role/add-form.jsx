import React from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from "antd";
const Item = Form.Item
/*
* 添加分类的form组件
* */
class AddForm extends React.Component {
    formRef = React.createRef()
    static propTypes = {
        setForm:PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.props.setForm(this.formRef)
    }


    render() {
        return (
            <Form ref={this.formRef} key={new Date()}>
                <Item
                    label='角色名称'
                    name='roleName'
                    initialValue=""
                    rules={[
                        {
                            required: true,
                            message:'角色名称不能为空'
                        }
                    ]}
                >
                    <Input placeholder="请输入角色名称"/>
                </Item>
            </Form>
        )
    }
}

export default AddForm