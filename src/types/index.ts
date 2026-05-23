export interface Contribution { id:string; name:string; email:string; amount:number; reference:string; status:'pending'|'success'|'failed'; tier?:string; created_at:string }
export interface ContactFormData { name:string; email:string; subject:string; message:string }
export interface Certification { id:string; title:string; issuer:string; status:'active'|'processing'|'pending'; file_url?:string; description?:string }
