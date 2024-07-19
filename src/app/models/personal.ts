import {ItemDto} from "../models/ItemDto";
import { FileItem } from './FileItem';

export class Personal {
    personal_id: number;
    nombres: string;
    apellidos: string;
    email: string;
    patron: string;
    recibos : ItemDto[] = [];
    fileItems : FileItem[] = [];
}
