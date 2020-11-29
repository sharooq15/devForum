/* 
The Api changes required for voting for particular question and answer goes here
*/

import { 
  docClient, 
  getTableName 
} from "../../api-utils";

type CastVoteRequest = {
  body: {
    contentId: string,
    voteFor: string,
  }
}

const castVote = async (
  req:CastVoteRequest, 
  res:any
): Promise<boolean> => {
  const {
    body:{
      voteFor,
      contentId,
    }
  } = req;
  try{
    const tableName = getTableName(voteFor)
    const params = {
      TableName: tableName,
      Key: {
        "id": contentId,
      },
      UpdateExpression: "set vt = if_not_exists(vt, :start_with) + :vt",
      ExpressionAttributeValues: {
        ":vt": 1,
        ":start_with": 0,
      },
      ReturnValues: "UPDATED_NEW"
    };
    await docClient.update(params).promise();
  
  }catch (e) {
    console.log('Error Casting Vote', e);
    res.send(`Error Casting Vote To ${voteFor}`);
    return false;
  }
  if(res){
    res.send(`Successfully Casted Your Vote To ${voteFor}`);
  }
  return true;
}

export {
  castVote
}