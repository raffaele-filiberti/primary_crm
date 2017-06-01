export class Project {
  constructor( public id?:number, public customer_id?: number, public user_id?:number, public name?:string, public description?:string, public prv?: boolean, public archivied?:boolean, public created_at?: Date, public updated_at?: Date ){
  }
}
