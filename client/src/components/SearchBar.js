import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <input onChange={event => this.onInputChange(event.target.value)} placeholder="Search any country..."/>
            </div>
        );
    }
}

export default SearchBar;