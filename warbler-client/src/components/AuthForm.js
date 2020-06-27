import React,{Component} from 'react';

export default class AuthForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      username:"",
      password:"",
      profileImageUrl: ""
    };
    
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType,this.state).then(()=>{
      console.log("LOGGED IN SUCCESFULLY.")
    });
  }
  
  render(){
    const {email,username,password, profileImageUrl} = this.state
    const  {heading,buttonText, signUp} = this.props;
    return(
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              <label htmlFor="email" text="email">Email:</label>
              <input className="form-control" 
              id="email"type="text"name="email" 
              onChange={this.handleChange} value={email}></input>
              <label htmlFor="password" text="password">Password:</label>
              <input className="form-control" 
              id="passsword"type="password"name="password" 
              onChange={this.handleChange} value={password}></input>
               {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    type="text"
                    value={profileImageUrl}
                    onChange={this.handleChange}
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                  {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );

  }
}