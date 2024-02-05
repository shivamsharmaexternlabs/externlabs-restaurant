import React from 'react'
import './kdsScreen.css'
import foodparcel from '../../../images/food-parcel.svg'
import cooking from '../../../images/cooking.svg'
import DineIn from '../../../images/plate.svg'
import takeAwayVerified from '../../../images/take-away-verified.svg'
import DineInVerified from '../../../images/dineInVerified.svg'

function KdsBox() {
  return (
    <div>
      <div className='kgcardpart'>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Mark as Done<img src={takeAwayVerified} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>            
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle' style={{ backgroundColor: "#42B856" }}>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={DineIn} alt='img' /> Dine In</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist' >
            <li >
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button' style={{ border: "1px solid #42B856", color: "#42B856" }}> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button' style={{ border: "1px solid #42B856", color: "#42B856" }}> Mark as Done <img src={DineInVerified} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button' style={{ border: "1px solid #42B856", color: "#42B856" }}> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
        <div className='kgcardbox'>
          <div className='kgcardtitle'>
            <div className='leftpart'>
              <h3>Name</h3>
              <h4>00:10:53 </h4>
            </div>
            <div className='rightpart'>
              <h2> Table No.</h2>
            </div>
          </div>
          <div className='deliveryinfo'>
            <h3> <img src={foodparcel} alt='img' /> Take Away</h3>
            <h4>#2309</h4>
          </div>

          <ul className='kgcardlist'>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
            <li>
              <div className='leftpart'>
                <h3>1 X Sandwich</h3>
                <p>Extra cheese</p>
              </div>
              <div className='rightpart'>
                <button type='button'> Start Cooking  <img src={cooking} alt='img' /> </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default KdsBox