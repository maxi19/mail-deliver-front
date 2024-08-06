
export class Enviable {
    constructor(private destinatarios : Destinatario[]){}
}

export class Destinatario {
    nombres : string;
    apellidos : string;
    email : string;
    fileItems : FileItem[] = [];
} 

export class FileItem{
    name : String;
}