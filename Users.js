const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME;

require('dotenv').config();
const clientId= process.env.CLIENT_ID;

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(clientId);

async function verifyToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const userInfo = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      sub: payload.sub
    };

    const userId = userInfo.sub;
    const params = {
      TableName: tableName,
      Key: {
        'PK': `User${userId}`,
        'SK': `User${userId}`
      }
    };
    const result = await dynamodb.get(params).promise();
    
    // Check if user already exists in the system
    if (!result.Item) {
      // Add user to the system
      const user = {
        username: userInfo.name,
        email: userInfo.email
      };
      const putParams = {
        TableName: tableName,
        Item: {
          'PK': `User${userId}`,
          'SK': `User${userId}`,
          'user_data': {
            'username': user.username,
            'email': user.email
          }
        }
      };
      await dynamodb.put(putParams).promise();
    }
    
    return userInfo;
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    throw new Error('Invalid Google ID token');
  }
}

async function getUserInfoById(userId) {
  try {
    const params = {
      TableName: tableName,
      Key: {
        'PK': `User${userId}`,
        'SK': `User${userId}`
      }
    };

    const result = await dynamodb.get(params).promise();

    if (result.Item) {
      const userData = result.Item.user_data;
      const userInfo = {
        userId: userId,
        username: userData.username,
        email: userData.email
      };
      return userInfo;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    throw new Error('Failed to retrieve user information');
  }
}

module.exports = {
  verifyToken,
  getUserInfoById
};
