import React from 'react'
import PropTypes from 'prop-types'
import {Form,Input} from "antd";
const Item = Form.Item
/*
* 更新分类的form组件
* */
class UpdateForm extends React.Component {
    formRef = React.createRef();
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.props.setForm(this.formRef)
    }

    render() {
        const {categoryName} = this.props
        return (
            <Form ref={this.formRef} key={new Date()}>
                <Item
                    label='分类名称'
                    name='categoryName'
                    initialValue={categoryName}
                    rules={[
                        {
                            required: true,
                            message:'分类名称不能为空'
                        }
                    ]}
                >
                    <Input placeholder="请输入分类名称"/>
                </Item>
            </Form>
        )
    }
}

export default UpdateForm