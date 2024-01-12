import { useState, useEffect, React } from "react";

 const Ticks =({flg})=>{
    return<>
    <div className={`ticks ${flg ? 'clicked' :''}`}>
                    <div className="tick-1"></div>
                    <div className="tick-2"></div>                      
                </div>

    </>
}
export default Ticks;