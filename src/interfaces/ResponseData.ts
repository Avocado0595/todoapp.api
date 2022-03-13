class ResponseBase {
    result: boolean;
    message: string;
    constructor(result: boolean, message: string) {
        this.result = result;
        this.message = message;
    }
}

export class ResponseData extends ResponseBase {
    data?: any;
    constructor(message: string, data?: any){
        super(true, message);
        this.data = data;
    }
}
export class ResponseUser extends ResponseBase {
    data?: any;
    token?: string | undefined;
    constructor(message: string, data?: any, token?: string | undefined){
        super(true, message);
        this.data = data;
        this.token = token;
    }
}
export class ResponseErr extends ResponseBase{
    err?: any;
    constructor(message: string, err?: any){
        super(false, message);
        this.err = err;
    }
}