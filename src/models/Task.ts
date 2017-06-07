export class Task {
  constructor (public id?:number, public user_id?:number, public product_manager_id?:number, public project_id?:number, public template_id?:number, public item_number?:string, public design_type?:string, public name?:string, public description?:string, public deadline?:Date, public path?:string, public country?:string, public prt?:boolean, public archivie?:boolean, public bill?:boolean, public folder_id?:string, public created_at?: Date, public updated_at?: Date, public steps?: Step[], public step_task?: StepTask[]) {

  }
}

export class Template {
  constructor (public id?: number, public name?:string, public description?:string, public created_at?: Date, public updated_at?: Date, public steps?:Step[]) {

  }
}

export class Step {
  constructor (public id?:number, public template_id?:number, public name?:string, public description?:string, public created_at?:Date, public updated_at?:Date, public pivot?: StepTask, public details?:Detail[]){

  }
}

export class Detail {
  constructor (public id?:number, public name?:string, public description?:string, public agency_id?:number, public created_at?:Date, public update_at?:Date, public pivot?: {detail_id:number, step_id:number}, public roled?:boolean, public detail_type?: number) {

  }
}

export class StepTask {
  constructor (public id:number, public missed:boolean, public ref_id:number, public ref_description:string, public status:number, public step_id:number, public task_id:number, public detail_step_task: DetailStepTask[]) {

  }
}

export class DetailStepTask {
  constructor ( public id:number, public step_task_id: number, public files: File[], public dates: Data[]){
  }
}

export class File {
  constructor(public id:number, public filename:string, public description:string, public mime:string, public path:string, public size:number, public pivot: { status: number, detail_step_task_id: number, detail_id: number, }, public updated_at:Date, public created_at:Date){
  }

}

export class Data {
  constructor (public id?:number, public data?: Date, public description?:string,
               public pivot?: { status: number, detail_step_task_id: number, detail_id: number, }, public updated_at?:Date, public created_at?:Date){ }
}
