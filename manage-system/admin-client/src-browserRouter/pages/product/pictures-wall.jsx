import React from 'react'
import {Upload, Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api/index'
import PropTypes from 'prop-types'
import {BASE_IMG_URL} from '../../utils/constants'
/*
* 用于图片上传的组件
* */

//base64转换
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    static propTypes = {
        imgs:PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        let fileList = []
        const {imgs} = this.props
        if(imgs && imgs.length > 0){
            fileList = imgs.map((img,index)=>({
                uid: -index,// 每个图片都有一个唯一id
                name: img,// 文件名
                status: 'done', // 图片状态：done：已上传 uploading：上传中 error：上传失败 removed：已删除
                url: BASE_IMG_URL + img,// 图片地址
            }))
        }
        this.state = {
            previewVisible: false,//标识是否显示大图预览
            previewImage: '',
            previewTitle: '',
            fileList//所有已上传图片的数组
        };

    }



    // 获取所有已上传图片文件名的数组
    getImgs = () => {
        return this.state.fileList.map(file=>file.name)
    }

    // 关闭modal
    handleCancel = () => this.setState({ previewVisible: false });

    // 图片预览
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = async ({ file,fileList }) => {
        // 上传成功，将当前上传的file信息修正（name，url）

        if(file.status === 'done'){
            const result = file.response
            if(result.status === 0){
                const {name,url} = result.data
                file = fileList[fileList.length-1]
                file.name = name
                file.url = url
                message.success('上传图片成功')
            }else{
                message.error('上传图片失败')
            }
        }else if(file.status === 'removed'){
            // 删除
            const result = await reqDeleteImg(file.name)
            if(result.status === 0){
                message.success('删除图片成功')
            }else{
                message.error('删除图片成功')
            }
        }
        // 在操作过程中更新fileList状态
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload"
                    accept='image/*'
                    listType="picture-card"
                    name='image'// 请求参数名
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
