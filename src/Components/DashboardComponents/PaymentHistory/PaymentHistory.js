import React from 'react'
import './paymenthistory.css'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar'

const PaymentHistory = () => {
    return (
        <>

            <DashboardLayout>
                <div className='dasboardbody'>
                    <DashboardSidebar />
                    <div className='contentpart paymenthispage'>
                        <div className='title'>
                            <h2> Payment History </h2>
                        </div>

                        <ul className='paylist'>
                            <li>
                                <div className='clear'>
                                    <select className='float-end'>
                                        <option> Month </option>
                                        <option> Year </option>
                                    </select>
                                </div>
                                <h3> Basic  </h3>
                                <p>Unlock essential features to streamline your restaurant operations with our cost-effective Basic subscription.</p>
                                <h4>SAR49<span>/Per Month</span></h4>
                            </li>
                            <li>
                                <div className='clear'>
                                    <select className='float-end'>
                                        <option> Month </option>
                                        <option> Year </option>
                                    </select>
                                </div>
                                <h3> Premium  </h3>
                                <p>Unlock essential features to streamline your restaurant operations with our cost-effective Basic subscription.</p>
                                <h4>SAR49<span>/Per Month</span></h4>
                            </li>
                        </ul>

                        <div className='paymenttable'>
                            <table>
                                <tr>
                                    <th>  Status</th>
                                    <th> Amount</th>
                                    <th> Start Date</th>
                                    <th> Plan </th>
                                    <th> End Date </th>
                                    <th> Description </th>
                                    <th> Action </th>
                                </tr>
                                <tr>
                                    <td><span className='dot dotred'></span>Current Plan</td>
                                    <td>$90</td>
                                    <td>24/10/23</td>
                                    <td>Basic Plan</td>
                                    <td>24/11/23</td>
                                    <td>Payment via Paypal</td>
                                    <td> <button type='button' className='btn1'>cancel</button> </td>
                                </tr>
                                <tr>
                                    <td><span className='dot dotgreen'></span>Current Plan</td>
                                    <td>$90</td>
                                    <td>24/10/23</td>
                                    <td>Basic Plan</td>
                                    <td>24/11/23</td>
                                    <td>Payment via Paypal</td>
                                    <td> <button type='button' className='btn1'>cancel</button> </td>
                                </tr>

                                <tr>
                                <td><span className='dot dotyellow'></span>Current Plan</td>
                                <td>$90</td>
                                <td>24/10/23</td>
                                <td>Basic Plan</td>
                                <td>24/11/23</td>
                                <td>Payment via Paypal</td>
                                <td> <button type='button' className='btn1'>cancel</button> </td>
                            </tr>

                            </table>
                        </div>

                    </div>
                </div>
            </DashboardLayout>


        </>
    )
}

export default PaymentHistory
