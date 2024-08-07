import {ItemDto} from "../models/ItemDto";
import { FileItem } from './FileItem';

export class Personal {
    personal_id: number;
    username: string;
    nombres: string;
    apellidos: string;
    email: string;
    patron: string;
    recibos : ItemDto[] = [];
    fileItems : FileItem[] = [];

    public constructor(init?: Partial<Personal>) {
        Object.assign(this, init);
    }
}
