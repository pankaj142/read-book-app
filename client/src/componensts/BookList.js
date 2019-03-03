import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';

//components
import BookDetails from '../componensts/BookDetails';

class BookList extends Component{
    constructor(props){
        super(props);
        this.state= {
            selected: null
        }
    }

    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Books loading ...</div>)
        }else{
            return data.books.map((book)=>{
                return <li key={book.id} onClick={(e)=> this.setState({selected: book.id})}>{book.name}</li>
            })
        }
    }
    render(){
        return(
            <div>
                <div className="col-8">
                    <h1>My Favourite Books</h1>
                    <ul id="book-list" >
                        {this.displayBooks()}
                    </ul>
                </div>
                <div className="col-4">
                    <BookDetails bookId={this.state.selected} />
                </div>
            </div>
        )
    }
}
export default graphql(getBooksQuery)(BookList);