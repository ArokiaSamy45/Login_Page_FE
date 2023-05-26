import React, { Component} from 'react';

export default  class UserDetails extends Component {
   constructor(props) {
    super(props);
    this.state = {
 userData:"",
    }
}
   
   
    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/userData`, {
  method: "POST",
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({
    token: window.localStorage.getItem("token"),
  })
  }).then((res)=>res.json())
  .then((data)=>{
    console.log(data, "userData");
    this.setState({userData: data.data});
    if(data.data=='token expired'){
        alert("Token expired");
        window.localStorage.clear();
window.location.href = "./sign-in";
    }
  })
    }
    logOut=()=>{
window.localStorage.clear();
window.location.href = "./sign-in";
    }
    render() {
        return (
            <div>
                Name<h1>{this.state.userData.fname}</h1>
                Email<h1>{this.state.userData.email}</h1><br/>
                <button onClick={this.logOut} className='btn btn-primary'>Logout</button>
            </div>
        )
    }

}