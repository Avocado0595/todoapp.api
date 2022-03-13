- sign-up: POST api/user 
  + req(username, password)
  + res:
    + result: true|false
    + message: string;
    + data?: any;
    + error?: any;
    + token?: string | undefined;