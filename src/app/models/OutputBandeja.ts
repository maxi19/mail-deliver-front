export  interface OutputBandeja {
    cantidad:     number;
    destinatario: string;
    email:        string;
    recibos:      Recibo[];
    emails:       null;
}

export interface Recibo {
    id:           number;
    usuario:      string;
    path:         string;
    nombre:       string;
    estado:       string;
    fecha:        Date;
    destinatario: string;
    email:        string;
    filesPath:    string;
    filesName:    string;
}

