import React from 'react';
import { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    name: '',
    date: '',
    details: '',
    image: '',
    posts: [],
  }
  getPosts = () => {
    axios.get('http://localhost:3001/posts')
    .then((response) => this.setState({posts: response.data}),
    (err) => console.error(err))
    .catch((error) => console.error(error))
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/posts', this.state).then((response) => {this.getPosts()})
  }
  deletePost = (event) => {
    axios.delete('http://localhost:3001/posts' + event.target.value).then((response) => {this.getPosts()})
  }
  updatePost = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('http://localhost:3001/posts' + id, this.state).then((response) => {
      this.getPosts()
      this.setState({
         name: '',
         date: '',
         details: '',
         image: '',
      })
    })
  }
  componentDidMount = () => {
    this.getPosts()
  }
  render = () => {
    const output = (
      <div className="posts">
       <h1> My Health App </h1>
       <br />
       <div>
         <h3>Add New Entry</h3>
         <br />
         <form onSubmit={this.handleSubmit}>
           <label htmlFor="name">Name</label>
           <input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
           <br />
           <label htmlFor="date">Date</label>
           <input type="text" id="date" onChange={this.handleChange} value={this.state.date} />
           <br />
           <label htmlFor="details">Details</label>
           <input type="text" id="details" onChange={this.handleChange} value={this.state.details}/>
           <br />
           <button onClick="true">Pain</button>
           <br />
           <input type="submit" value="Create New Post" />
         </form>
         </div>
        {this.state.posts.map((post) => {
          return (
            <div>
              <div className="post" key={post.id}>
                <h3>Name: {post.name}</h3>
                <img src={post.image} alt="" />
                <p className="details">Details: {post.details}</p>
                <p>Details: {post.details}</p>
                <button value={post.id} onClick={this.deletePost}>Delete</button>
              </div>
              <div>
                <details>
                  <summary>Edit Post</summary>
                  <form id={post.id} onSubmit={this.updatePost}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <label htmlFor="name">Image</label>
                    <input type="url" id="image" onChange={this.handleChange} value={this.state.image} />
                    <br />
                    <label htmlFor="Details">Details</label>
                    <input type="text" id="details" onChange={this.handleChange}/>
                    <br />
                    <input type="submit" value="Update Post" />
                  </form>
                </details>
                <br />
              </div>
            </div>
          )
        })}
      </div>
    );
    return output
  }
}

export default App;
