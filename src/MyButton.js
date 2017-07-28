import React, { Component } from 'react';
export default class MyButton extends Component {

 
    render(){

        function addUser(){

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var user = JSON.parse(this.responseText);
                    console.log(user);
                }
            };
            xhttp.open("POST", "http://192.168.4.15:9000/users", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify({ 
            name:'Bengisu', surname:'aydogdu', age:21, id:5
            }));




        }
        
        function onPressLearnMore(){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log( this.responseText);
                    console.log(typeof this.responseText);
                    var obj= JSON.parse(this.responseText);
                    console.log(obj);
                }
            };
            xhttp.open("GET", "http://192.168.4.15:9000/users", true);
            xhttp.send();
        }  
       
        return (

         <div>
           <button onClick={onPressLearnMore} >my button text</button>
           <button onClick={addUser}>add user</button>
          </div>



           ); 
      }
}
