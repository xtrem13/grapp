import React,{useState} from 'react';
import menu from '../assets/icons/menu.svg';
import lock_open from '../assets/icons/lock_open.svg';
import lock_closed from '../assets/icons/lock.svg';


const TopControls = (props) => {

  const [lock, setLock]=useState(false);
  
  return (
    		<div className="top-control">
                <span className="hamburger">
                    <img src={menu} alt="" />
                </span>
                <input type="text" className="search"/>
                <span className="lock">
                    <img src={lock?lock_closed:lock_open} alt="" onClick={()=>setLock(!lock)}/>
                </span>
            </div>
  	)
}

export default TopControls;
