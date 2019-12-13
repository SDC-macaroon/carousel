import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Carousel from './components/Carousel';
import './style.css';

const pathArray = window.location.pathname.split('/');
const productId = pathArray[pathArray.length - 2];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      baseIndex: 0,
      styles: [],
    };
    this.nextThree = this.nextThree.bind(this);
    this.previousThree = this.previousThree.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `/api/morestyles/${productId}`,
      success: (result) => {
        this.setState({
          styles: result,
        });
      },
    });
  }

  nextThree() {
    this.setState(({ baseIndex, styles }) => ({
      baseIndex: baseIndex < styles.length - 6 ? baseIndex + 3 : styles.length - 4,
    }));
  }

  previousThree() {
    this.setState(({ baseIndex }) => ({
      baseIndex: baseIndex > 3 ? baseIndex - 3 : 0,
    }));
  }

  render() {
    const { baseIndex } = this.state;
    const { styles } = this.state;
    const styleSlider = {
      transform: `translateX(${baseIndex * -25}%)`,
      transition: '.55s',
    };
    return (
      <div>
        <div className="title">Available t-shirt styles</div>
        <Carousel
          slider={styleSlider}
          styles={styles}
          nextThree={this.nextThree}
          previousThree={this.previousThree}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('johnApp'));
