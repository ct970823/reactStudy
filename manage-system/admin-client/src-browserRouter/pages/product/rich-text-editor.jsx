/*
* 用来指定商品详情的富文本编辑器
* */
import React from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
class RichTextEditor extends React.Component {
    static propTypes = {
        detail:PropTypes.string.isRequired
    }
    constructor(props) {
        super(props);
        let html = this.props.detail
        if(html){
            const contentBlock = htmlToDraft(html);
            // const contentBlock = convertFromHTML(html);
            console.log(111,contentBlock)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        }else{
            this.state = {
                editorState:EditorState.createEmpty()
            }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    //返回html格式的数据
    getDetail = () => {
       return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }


    // 上传图片
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/manage/img/upload');
                // xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url
                    // 格式要注意
                    resolve({data:{link:url}});
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        )
    }

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{border:'1px solid #000',minHeight:200,paddingLeft:10}}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        );
    }
}

export default RichTextEditor