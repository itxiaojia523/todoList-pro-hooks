import React,{useRef} from 'react'
import './index.scss'

export default function AddInput(props) {
    const {isInputShow,addItem} = props,
        inputRef = useRef()

    const submitValue = ()=>{
        const inputValue = inputRef.current.value.trim()
        // 提交事项后判断
        if (inputValue.length === 0) return
        //提交
        addItem(inputValue)

        //清空
        inputRef.current.value = ''
    }
    return (
        <>
            {
                isInputShow
                ?
                (
                    <div className="input-wrapper">
                        <input type="text" ref={inputRef} placeholder='请输入代办事件'/>
                        <button 
                         className='btn btn-primary'
                         onClick={submitValue}
                        >
                            增加 
                        </button>
                    </div>
                )
                :
                ''
            }
            
        </>
    )
}
