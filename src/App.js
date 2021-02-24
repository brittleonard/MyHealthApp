import React from 'react';
import { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios'

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
        posts: [],
      }
   }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

 addPost = (event) => {
    event.preventDefault();
    axios.post('https://womenshealth-backend.herokuapp.com/posts', {
      name: this.state.name,
      date: this.state.date,
      details: this.state.details,
      image: this.state.image
   }).then((response) => {
      console.log(this.state.posts);
      console.log(response.data);
      this.setState({
         posts: response.data
      })
   }).catch((error) => console.log(error))
}

  deletePost = (event, id) => {
    axios.delete('https://womenshealth-backend.herokuapp.com/posts/' + event.target.value).then((response) => {
      // this.getPosts()
      const post = this.state.posts.filter((post) => post.id !== id)
      console.log(response);
      console.log(response.data);
      console.log(post);
      this.setState({
         post: response.data
      })
   }).catch((error) => console.log(error))
  }
  updatePost = (event, id) => {
    // event.preventDefault()
    // const id = event.target.id
    axios.put(`https://womenshealth-backend.herokuapp.com/posts/${event.target.id}`, {name:this.state.name, date:this.state.date, details:this.state.details, image:this.state.image}).then((response) => {
      console.log(response);
      this.setState({
         posts: response
      })
   }).catch(err => {
      console.log(err);
   })
  }

  componentDidMount() {
    // this.getPosts()
    axios.get('https://womenshealth-backend.herokuapp.com/posts')
    .then((response) => {this.setState({posts: response.data})
    // .catch((error) => console.log(error))
})
const posts = this.state.posts;
}



  render() {
     return(<React.Fragment>
      <div className="post">
      <h1> My Health App </h1>
      <br />
      <div className="form">
        <h3>Add New Entry</h3>
        <form onSubmit={this.addPost}>
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
          <input className="submit" type="submit" value="Create New Post" />
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
