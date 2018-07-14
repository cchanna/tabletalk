import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Thread from "./Thread";

rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  max-width: 600px;
  width: 100%;
`

class Threads extends Component {
  static propTypes = {
    threads: arrayOf(shape({
      id: number.isRequired,
      text: string.isRequired,
      reincorporatedBy: string
    })),
    createThread: func.isRequired,
    updateThread: func.isRequired,
    deleteThread: func.isRequired,
    reincorporateThread: func.isRequired
  }

  handleChange = ({id, text}) => {
    const { updateThread, deleteThread } = this.props;
    if (text) {
      updateThread({id, text})
    }
    else {
      deleteThread({id})
    }
  }
  
  render() {
    const { threads, createThread, reincorporateThread } = this.props;

    return (
      <Container>
        {threads.map(thread => (
          <Thread 
            {...thread} 
            key={thread.id} 
            onChange={this.handleChange} 
            reincorporateThread={reincorporateThread}/>
        ))}
        <Thread onChange={createThread}/>
      </Container>
    );
  }
}

export default Threads;