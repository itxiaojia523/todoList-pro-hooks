import React,{useRef} from 'react'
import Modal from '..'
import { formatDateTime } from '../../../libs/utils'
import './index.scss'
export default function EditModal(props) {
    const {isShowEditModal,data,submitEdit } = props,
          inputRef = useRef(),
          checkRef = useRef()
          
    // 点击提交后提交数据
    const formatNewData = ()=>{
        // 获取文本框内容
        const val = inputRef.current.value.trim(),
            valLen = val.length
            // 根据长度判空，如果0，就设置为默认值data.content
            if(valLen === 0){
                inputRef.current.value = data.content
                return
            }

            // 不为0，即更新内容，需要生成一个新item对象
            const newData = {
                id: new Date().getTime(),
                content: val,
                completed: checkRef.current.checked
            }

            //数据对象生成好了，接下来传递给父组件，根据id  父-子：函数 子-父：参数
            //要传递原id, 父组件根据原id找到那一项替代调
            submitEdit(newData,data.id)
    }
    return (
        <Modal
        isShowModal = {isShowEditModal}
        modalTitle = '编辑事件'
        >
            <p className="topic">时间：{formatDateTime(data.id)}</p>   
            <p className="topic">
                <textarea ref={inputRef} defaultValue={data.content} className="text-area"></textarea>
            </p>
            <p className="topic">
                状态:
                <input type="checkbox" defaultChecked={data.completed? true : false}
                ref={checkRef}
                />
            </p>
            <button className='btn btn-primary comfirm-btn'
                onClick= {formatNewData}
            >
                提交
            </button>

        </Modal>
    )
}
