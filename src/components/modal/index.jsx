import React from 'react'

import '../../assets/css/common.scss'

export default function Modal(props) {
    const {isShowModal, modalTitle, children} = props
    return (
        <>
         {
             isShowModal?
             (
                 <div className="modal">
                     <div className="inner">
                         <div className="m-header">{modalTitle}</div>
                         <div className="contentWrapper">
                             {children}
                         </div>
                     </div>
                 </div>
             )
             :
             ''
         }
        </>
    )
}
