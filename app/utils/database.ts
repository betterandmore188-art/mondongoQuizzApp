interface Database{
    connection:any;
    insertOne(collection:string,document:any):Promise<any>;
    insertMany(collection:string,documents:any[]):Promise<any>;
    findOne(collection:string,query:any):Promise<any>;
    find(collection:string,query:any):Promise<any[]>;
    updateOne(collection:string,query:any,update:any):Promise<any>;
    updateMany(collection:string,query:any,update:any):Promise<any>;
    deleteOne(collection:string,query:any):Promise<any>;
    deleteMany(collection:string,query:any):Promise<any>;
}