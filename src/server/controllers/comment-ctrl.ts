/*
Comment changes will be here
- Creating comments that are related to question and answers will be done here
*/

import { docClient, getTableName } from '../../api-utils';

type CreateCommentRequest = {
  body: {
    contentId: string;
    comment: string;
    commentFor: string;
  };
};

const createComment = async (
  req: CreateCommentRequest,
  res: any
): Promise<boolean> => {
  const {
    body: { contentId, comment, commentFor },
  } = req;
  try {
    const tableName = getTableName(commentFor);
    const params = {
      TableName: tableName,
      Key: {
        id: contentId,
      },
      UpdateExpression:
        'set c = list_append(if_not_exists(c, :empty_list), :c)',
      ExpressionAttributeValues: {
        ':empty_list': [],
        ':c': [comment],
      },
      ReturnValues: 'UPDATED_NEW',
    };
    await docClient.update(params).promise();
  } catch (e) {
    console.log(`Error Adding Comment to ${commentFor}`);
    res.send('Error Adding Comment');
    return false;
  }
  if (res) {
    res.send('Successfully Added the Comment');
  }
  return true;
};

export { createComment };
