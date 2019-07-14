import React from 'react'
// import AccountRequst from './AccountRequest';
// import ChangePassword from './ChangePassword';
// import CreateNote from './CreateNote';
// import ViewMyNote from './ViewMyNote';
// import ViewProfile from './ViewProfile';
import Button from './Button';


function Setting(props) {
    return (
        <div className="setting">
            <div className="top">
                    <div className="left">
                        <Button title="Create Note" link="/createnote" className="primary button" />
                        <Button title="View My Note" link="/viewmynote" className="primary button" />
                        <Button title="Monthly Chart" link="/monthlychart" className="primary button" />

                    </div>
                    <div className="right">
                        <Button title="View Profile" link="/viewprofile" className="primary button" />
                        <Button title="Account Request" link="/accountrequest" className="primary button" />
                        <Button title="Change Password" link="/changepassword" className="danger button" />

                    </div>
                </div>
            {/* <div className="bottom">
                <Button title="Change Password" link="/changepassword" className="danger button" />
            </div> */}
        </div>
    )
}


export default Setting

