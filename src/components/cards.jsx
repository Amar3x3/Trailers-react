import React from "react";
import '../styles/main.css';
import {Link} from "react-router-dom";


const Cards=({imgurl,title,id,genre,bigBannerFlg})=>{

  


    return<>
        <div className={`card ${bigBannerFlg ? 'bigcard':''} ` }>
           
        <Link to={{
          pathname: `/movieDesc/${encodeURIComponent(title)}/${id}/${encodeURIComponent(imgurl)}`,
          state: {id,title,imgurl,genre},
          }}>
        
          <div className="img-cont">
            <img className="" src={imgurl} alt="" />
            
          </div>

       
      </Link>
            
        </div>
    </>
}

export default Cards;