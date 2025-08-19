import * as crypto from "crypto";
interface User{
    id?:string;
    username: string;
    password?: string;
    salt: string;
    hash:string;
    createdAt?:Date;
}
class UserFunction
{
    constructor(private user: User) {this.GenerateSalt()};
    GenerateSalt(): void {
    let bytesalt:any;
    let hexsalt:string;
     bytesalt=crypto.randomBytes(32); //generate a 32 random Bytes
      hexsalt=bytesalt.toString(16); //transform the 32 random bytes in HEX format
      this.user.salt=hexsalt;
      
      this.GenerateHash()
    }
    private GenerateHash():void{
        const hmac:any=crypto.createHmac('sha256',this.user.salt).update(this.user.password!).digest("hex");
        this.user.hash=hmac;
        delete this.user.password;
    }
    
}
//interface LoginUser
