const { verifyToken, getUserInfoById } = require('./Users');

exports.handler = async (event, context) => {
  let responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  };
  
  try {
    const httpMethod = event.httpMethod.toUpperCase();
    const path = event.path;
    const body = JSON.parse(event.body);    

    switch (httpMethod) {
      case 'POST':
        if (path === '/verifyToken') {
          const { idToken } = body;
          const userInfo = await verifyToken(idToken);
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Token verified successfully', userInfo }),
            headers: responseHeaders,
          };
        }
        break;
      case 'GET':
        if (path === '/getUserInfo') {
          const userId = event.requestContext.authorizer.principalId;
          const userInfo = await getUserInfoById(userId);
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User info retrieved successfully', userInfo }),
            headers: responseHeaders,
          };
        }
        break;

      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Not Found' }),
          headers: responseHeaders,
        };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found' }),
      headers: responseHeaders,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: responseHeaders,
    };
  }
};
