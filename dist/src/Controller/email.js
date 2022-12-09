"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function email(id) {
    const link = `http://locahost:9000/resetpassword/${id}`;
    const temp = `<div style="max-width: 700px;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="text-align: center; text-transform: uppercase;color: teal;">Change your password.</h2>
        <p>Hi, kindly click on the button to change your password.
        </p>
         <a href=${link}
         style="background: crimson; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>`;
}
