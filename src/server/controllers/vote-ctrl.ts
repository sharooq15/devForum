/* 
The Api changes required for voting for particular question and answer goes here
*/

import  {
  Content
} from '../../common'

type CastVoteRequest = {
  body: {
    voteFor: Content,
  }
}

const castVote = (req:CastVoteRequest, res:any) => {
  const {
    body:{
      voteFor
    }
  } = req;
  // TODO: Based on commentFor we can change the comments to either question or answer
}

export {
  castVote
}