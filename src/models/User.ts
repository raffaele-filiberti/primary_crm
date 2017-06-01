export class User {
    constructor (public id?:number, public name?:string, public email?:string, public password?:string,
        public cell_phone?:string, public address?:string, public first_name?:string, public last_name?:string, public fax?:string,
        public postcode?:string, public province?:string, public city?:string, public nation?:string, public ibernate?:boolean,
        public subscribed?:boolean, public notify?:boolean, public created_at?: Date, public updated_at?: Date,
        public roles?:Role[], public customers?: Customer[]) {}
}

export class Customer {
    constructor (public id?:number, public name?:string, public description?: string,
        public created_at?: Date, public updated_at?: Date) {}
}

export class Role{
    constructor (public id?:number, public name?:string,public display_name?:string, public description?: string, public created_at?: Date, public updated_at?: Date) {}
}
