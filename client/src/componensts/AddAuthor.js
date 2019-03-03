import React, {Component} from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,addAuthorMutation, getBooksQuery} from '../queries/queries';

class AddAuthor extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            age :""
        }
    }
    submitForm(e){
        e.preventDefault();
        console.log('state', this.state)
        this.props.addAuthorMutation({
            variables:{
                name: this.state.name,
                age: this.state.age,
            },
            refetchQueries:[{query: getAuthorsQuery}]
        });
        this.setState = {
            name: "",
            age :""
        }
    }
    render(){
        return(
            <form id="add-author" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Author Name: </label>
                    <input type="text"
                        onChange= {(e)=> this.setState({name: e.target.value})}
                        value={this.state.name} />
                </div>
                <div className="field">
                    <label>Age: </label>
                    <input type="number" 
                        onChange={(e)=>this.setState({age: e.target.value})}
                        value={this.state.age} />
                </div>
                <button disabled={this.state.name === "" || this.state.age === ""} id="submit-add-author">+</button>
            </form>
        )
    }
}

export default compose(
    graphql(addAuthorMutation, {name:"addAuthorMutation"})
)(AddAuthor);