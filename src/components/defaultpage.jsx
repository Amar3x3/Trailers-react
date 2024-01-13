import React from "react";
import '../styles/footer.css';
import {Link} from "react-router-dom";

const DefaPage=()=>{
    const handeldisplaynone=()=>{
        const none = document.querySelector('.defpage');
        none.classList.add('dis-none')
    }
    return<>
    <div className="uni-up-margin defpage">
       <div className="footer">
       <footer>
        
       

        <ul className="menu text-und">
            <li><Link className='sidebar-link text-und' to='/'>Home</Link></li>
            <li><Link className='sidebar-link text-und' to='/search'>Search</Link></li>
        </ul>

       
    </footer>
       </div>
    </div>
    </>
}
export default DefaPage;