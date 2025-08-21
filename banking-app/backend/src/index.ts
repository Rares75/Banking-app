import { error } from "console";
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
    private password?:string
    static users: User[] = [];
    constructor(private user: User,pass:string) {this.password=pass;
         this.GenerateSalt()
        
    };
    VerifyPassword(password:string):void 
    {
        if((/[A-Z]/.test(password)&&/[a-z]/.test(password)&&/[0-9]/.test(password)&&/[!@#$%^&*()_+{}:"<>?;',./"]/.test(password))) new UserFunction(this.user,password);
        else 
        {
            console.log("password need to have an upper case,a smaller case,a number and a special character,please try again")
           //this.password=new pass...... need to put here the new password input
           ;
        }
    }
    GenerateSalt(): void {
    let bytesalt:Buffer;
    let hexsalt:string;
     bytesalt=crypto.randomBytes(32); //generate a 32 random Bytes
      hexsalt=bytesalt.toString('hex'); //transform the 32 random bytes in HEX format
      this.user.salt=hexsalt;
      
      this.GenerateHash()
    }
    private GenerateHash():void{
        const hmac:string=crypto.createHmac('sha256',this.user.salt).update(this.password!).digest("hex");
        this.user.hash=hmac;
        delete this.user.password;
        delete this.password;
        this.push(this.user.username,this.user.salt,this.user.hash)
    }
    push(name:string,salt:string,hash:string):void
    {
        UserFunction.users.push({
            username:name,
            salt:salt,
            hash:hash
        });
    }
}

class UserLogin 
{
    private userstorage:User[]=[];
    private username:string;
    private salt:string;
    private hash:string;
    private password?:string
    private count:number=0;
    constructor(name:string,password:string,code:string,longcode:string,private userStorage: User[])
    {
        this.username=name;
        this.salt=code;
        this.hash=longcode;
        this.password=password;
        
    }
    counter():void{
        this.count++;
        if(this.count==4) {throw new Error("3 login attempt made,please try again later"); 
                        this.count=0;}
    }
    private findusername(name:string,password:string):boolean
    {
        const pass:string=password;
        for(let i in UserFunction.users ){
            if(name===UserFunction.users[i]?.username)
            {
               this.username=UserFunction.users[i].username;
               this.hash=UserFunction.users[i].hash;
               this.salt=UserFunction.users[i].salt
               console.log("login succesfuly");
               this.count=0;
               this.password = password;
               this.VerifyHash();
               return true;
            }
          
        }
            console.log("username not found");
            this.counter();
            return false;
    }
    private VerifyHash():boolean{
        const hmac:string=crypto.createHmac("sha256",this.salt).update(this.password!).digest('hex')
        if(hmac!=this.hash)
        {
            console.log("wrong password,please try again");
            this.counter();
            return false;
        }
        else {
            console.log("login succesfuly");
            this.count=0;
            delete this.password;
            return true;        
        }
        
    }
}

