import React from 'react';
import { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios'

class App extends Component {
   // constructor(props) {
   //    super(props)
      state = {
         name: '',
         date: '',
         details: '',
         image: '',
         posts: [],
      }



   handleChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value,
      })
   }

  getPosts = () => {
      axios.get('https://womenshealth-backend.herokuapp.com/posts')
      .then((response) => this.setState({posts: response.data}))
      .catch((error) => console.error(error))
}

 addPost = (event) => {
    axios.post('https://womenshealth-backend.herokuapp.com/posts',
    this.state).then((response) => {this.getPosts()})

}

   deletePost = (event, id) => {
      event.preventDefault();
      axios.delete('https://womenshealth-backend.herokuapp.com/posts/' + event.target.value).then((response) => {this.getPosts()})
   }


  componentDidMount = () => {
    this.getPosts()
  }


  render = () => {
     return(<React.Fragment>
      <div className="post">
      <h1> My Health App </h1>
      <br />
      <div className="form">
        <h3>Add New Entry</h3>
        <form>
          <label htmlFor="name">Name</label> <br />
          <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
          <br />
          <label htmlFor="date">Date</label> <br />
          <input type="text" id="date" onChange={this.handleChange} value={this.state.date} />
          <br />
          <label htmlFor="image">Image</label> <br />
          <input type="text" id="image" onChange={this.handleChange} value={this.state.image}/>
          <br />
          <label htmlFor="details">Details</label> <br />
          <input type="text" id="details" onChange={this.handleChange} value={this.state.details}/>
          <br />
          <input className="submit" type="submit" onClick={this.addPost} value="Create New Post" />
        </form>
        </div>
        <h2> Recent Entries </h2>
     </div>
     <div>
         {this.state.posts.map((post, index) => {
           return (
             <div key={index}>
             <div className="entry">
                  <div className="posts">
                    <h3>{post.name}</h3>
                    <img src={post.image} alt="image entry" />
                    <p className="details">Details: {post.details}</p>
                    <p>Date: {post.date}</p>
                    <button value={post.id} onClick={this.deletePost}>Delete</button>
                  </div>
                   <br />
                </div>
             </div>
          )
        })
     }
     </div>
     </React.Fragment>
  )
 }
}

export default App;
