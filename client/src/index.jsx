/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Carousel from './components/Carousel.jsx';

const pathArray = window.location.pathname.split('/');
console.log('pathArray: ', pathArray);
const productId = '2001';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      baseIndex: 0,
      styles: [
        {
          _id: '5de19ec2f57f31a4034dce27', productId: 2002, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1561726588-42f8e737095b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 21.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce2c', productId: 2003, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1564579362514-755914c2e605?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 14.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce2b', productId: 2004, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1559793366-de1dcaa3d8ae?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 20.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce2d', productId: 2005, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1560358483-e28ccabf1d2b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 19.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce30', productId: 2006, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1566971327205-4d4c5c51e19a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 24.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce32', productId: 2007, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1562028297-1a02ab6dd46d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 18.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce34', productId: 2008, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1553445297-8bfd1c0ecfd8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 21.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce35', productId: 2009, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/flagged/photo-1561049916-32defe8ecf2a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 16.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce39', productId: 2010, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1550647041-ecefa9e1d612?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 17.95,
        },
        {
          _id: '5de19ec2f57f31a4034dce3b', productId: 2011, name: 'Sloth T-Shirt', photo_url: 'https://images.unsplash.com/photo-1559357678-093538a18a1f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNDM4OX0', price: 15.95,
        }],
    };
    this.nextThree = this.nextThree.bind(this);
    this.previousThree = this.previousThree.bind(this);
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: `/morestyles/${productId}`,
  //     success: (result) => {
  //       this.setState({
  //         styles: JSON.parse(result),
  //       });
  //       console.log('result: ', result);
  //     },
  //   });
  // }

  nextThree() {
    if (this.state.baseIndex < (this.state.styles.length - 3)) {
      this.setState({ baseIndex: this.state.baseIndex + 3 });
    } else {
      this.setState({ baseIndex: this.state.styles.length - 1 });
    }
    console.log(this.state.baseIndex);
  }

  previousThree() {
    if (this.state.baseIndex > 3) {
      this.setState({ baseIndex: this.state.baseIndex - 3 });
    } else {
      this.setState({ baseIndex: 0 });
    }
    console.log(this.state.baseIndex);
  }


  // eslint-disable-next-line class-methods-use-this
  render() {
    return <Carousel
      baseIndex={this.state.baseIndex}
      styles={this.state.styles}
      nextThree={this.nextThree}
      previousThree={this.previousThree}
      />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
