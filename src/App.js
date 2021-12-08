import React,{useState, useCallback,useEffect} from 'react';
import './App.css';
import MyHeader from './components/header';
import AddInput from './components/addInput';
import TodoItem from './components/todoItem';
import CheckModal from './components/modal/checkModal';
import EditModal from './components/modal/editModal';
import NoDataTip from './components/noDataTip';

function App() {
  const [isInputShow, setInputShow] = useState(false),
    [isShowCheckModal, setShowCheckModal] = useState(false),
    [isShowEditModal, setShowEditModal] = useState(false),
    [todoList,setTodoList] = useState([]),
    [currentData, setCurrentData] = useState({})

    // 空数组表didMount，从本地中拿数组
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData')||'[]')
    setTodoList(todoData)
  }, [])  
// 两个effect注意顺序
  // 相当于update，更新todoList时候，往本地中存数据
  useEffect(() => {
    localStorage.setItem('todoData',JSON.stringify(todoList))
  }, [todoList])  

  const addItem = useCallback((value)=>{
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    }
    setTodoList((todoList)=> [...todoList,dataItem])
    setInputShow(false)
  // 以上为构建数组数据
  },[]);
  
  //勾选框切换
  const completeItem = useCallback((id)=>{
    setTodoList((todoList)=> todoList.map((item)=>{
      if(item.id === id) item.completed = !item.completed
      return item
    }))
  },[])

  const removeItem = useCallback((id)=>{
    setTodoList((todoList)=> todoList.filter((item)=> item.id !== id))
  },[])

  const openCheckModal = useCallback((id)=>{
    // setCurrentData(()=> todoList.filter((item)=> item.id === id)[0])
    // 把获取现有data 单独提取成一个函数
    _setCurrentData(id,todoList)
    setShowCheckModal(true)
  },[todoList])

  const openEditModal = useCallback((id)=>{
      _setCurrentData(id,todoList)
      setShowEditModal(true)
  },[todoList])

  // 根据id匹配，如果匹配对了 item = newData
  const submitEdit = useCallback((newData,prevId)=>{
    setTodoList((todoList)=>
      todoList.map((item)=>{
        if(item.id === prevId) item = newData
        return item
      })
    )
    setShowEditModal(false)
  },[])

  function _setCurrentData(id,todoList){
    setCurrentData(()=> todoList.filter((item)=> item.id === id)[0])
  }

  

  

  return (
    <div className="App">
      <EditModal
        isShowEditModal = {isShowEditModal}
        data = {currentData}
        submitEdit = {submitEdit}
      />
      <CheckModal 
        isShowCheckModal = {isShowCheckModal}
        closeModal = {()=> setShowCheckModal(false) }
        data = {currentData}
      />
      <MyHeader openInput={()=> setInputShow(!isInputShow) }/>
      <AddInput
       isInputShow={isInputShow}
       addItem={addItem}
      />
      {
        !todoList || todoList.length === 0
        ?
        <NoDataTip/>
        :
        <ul className='todo-list'>
        {
          todoList.map((item,index)=>{
            return(
              <>
                <TodoItem
                  data = {item}
                  key = {index}
                  openCheckModal = {openCheckModal}
                  openEditModal = {openEditModal}
                  completeItem = {completeItem}
                  removeItem = {removeItem}
                />
              </>
            )
          })
        }
      </ul> 
      }
    </div>
  );
}

export default App;
