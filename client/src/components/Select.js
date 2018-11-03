import React from 'react';

class Select extends React.Component {
    // make these countries the same as the countries in app.js
    state = {
        countries: [1, 2, 3]
    }

    onChange = (event) => {
        const s = event.target.value
        console.log(s);
        
        const filtered = this.state.countries.filter((country) => {
            return country === 1
            // define this return statement to be the same
        })

        this.setState({
            countries: filtered
        })
    }

    render() {
        return (
            <input onChange={this.props.onTermChange}/>
        )
    }
}

export default Select;