import React from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Input} from "antd";
const Item = Form.Item
const Option = Select.Option
/*
* 添加分类的form组件
* */
class AddForm extends React.Component {
    formRef = React.createRef()
    static propTypes = {
        category:PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.props.setForm(this.formRef)
    }


    render() {
        const {category,parentId} = this.props
        console.log(category,parentId)
        return (
            <Form ref={this.formRef} key={new Date()}>
                <Item label='分类' name='parentId' initialValue={parentId}>
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            category.map(c=><Option value={c._id} key={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item
                    label='分类名称'
                    name='categoryName'
                    initialValue=""
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

export default AddForm