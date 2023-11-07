import React, { useState } from 'react'
import './categories.css'

import usePopUpHook from '../../../CustomHooks/usePopUpHook/usePopUpHook'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'
import LodingSpiner from '../../LoadingSpinner/LoadingSpinner'
import plus from '../../../images/plus.svg'

const Categories = () => { 
    const [popUpHook, popUpHookFun] = usePopUpHook("") 
    const [loadspiner, setLoadSpiner] = useState(false);

    const PopUpToggleFun = () => {
        popUpHookFun(o => !o)
    }
    return (
        <>
            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart managerpage'>
                        <div className='managertitle'>
                            <h2>Categories</h2>
                            <button type='button' className='mangerbtn' onClick={(e) => PopUpToggleFun()}> <img src={plus} alt='plusimg' /> Add Categories</button>


                        </div>
                    </div>
                </div>








            </DashboardLayout>
            <LodingSpiner loadspiner={loadspiner} />

        </>
    )
}

export default Categories