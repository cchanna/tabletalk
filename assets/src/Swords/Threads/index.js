import { connect } from 'react-redux'
import Threads from './Threads';
import { fromSwords, forSwords } from "state";

const { getThreads } = fromSwords;
const { createThread, updateThread, deleteThread } = forSwords;

const mapStateToProps = state => ({
  threads: getThreads(state)
})

const mapDispatchToProps = {createThread, updateThread, deleteThread}

export default connect(mapStateToProps, mapDispatchToProps)(Threads);