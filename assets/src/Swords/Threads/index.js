import { connect } from 'react-redux'
import Threads from './Threads';
import { fromSwords, forSwords } from "state";

const { getThreads } = fromSwords;
const { createThread, updateThread, deleteThread, reincorporateThread } = forSwords;

const mapStateToProps = state => ({
  threads: getThreads(state)
})

const mapDispatchToProps = {createThread, updateThread, deleteThread, reincorporateThread}

export default connect(mapStateToProps, mapDispatchToProps)(Threads);