export class User{
  constructor(
    public email:string,
    public localId:string,
    private _token:string,
    private _tokenexpiresDate:Date

  ){}
  get token(){
   if(!this._tokenexpiresDate|| new Date() > this._tokenexpiresDate){
    return null
   }
   return this._token
  }
}
