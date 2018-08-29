const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "groups-app-upload"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://d3ytwjwlof.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_odnnMx0An",
    APP_CLIENT_ID: "21ipa46pmf7gpdfc950o8msmtg",
    IDENTITY_POOL_ID: "us-east-1:d17f40c6-3722-40b4-b859-236c46abf376"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "groups-app-upload"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://d3ytwjwlof.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_odnnMx0An",
    APP_CLIENT_ID: "21ipa46pmf7gpdfc950o8msmtg",
    IDENTITY_POOL_ID: "us-east-1:d17f40c6-3722-40b4-b859-236c46abf376"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
