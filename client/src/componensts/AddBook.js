import React, {Component} from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre :"",
            authorId:""
        }
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return (<option disabled>authors loading...</option>)
        }else{
            return data.authors.map((author) =>{
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }
    submitForm(e){
        e.preventDefault();
        console.log('satate', this.state)
        this.props.addBookMutation({
            variables:{
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries:[{query: getBooksQuery}]
        });

        this.setState({
            name: "",
            genre :"",
            authorId:""
          });
    }
    render(){
        return(
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Name: </label>
                    <input type="text"
                        onChange= {(e)=> this.setState({name: e.target.value})}
                        value={this.state.name} />
                </div>
                <div className="field">
                    <label>Genre: </label>
                    <input type="text" onChange={(e)=>this.setState({genre: e.target.value})}
                        value={this.state.genre} />
                </div>
                <div className="field">
                    <label>Select Author</label>
                    <select onChange={((e)=>this.setState({authorId: e.target.value}))} 
                      value={this.state.authorId}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button disabled={this.state.name === "" ||
                    this.state.genre === "" || this.state.authorId === ""} id="submit-add-book">+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook);