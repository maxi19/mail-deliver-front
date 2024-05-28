import {Personal } from "./personal";
import { Pageable } from './Pageable';


export class PagePersonal {

    constructor( 
        content : Personal,
        pageable : Pageable,
        last : boolean,
        totalpages: number,
        totalElements : number,
        size : number,
        sort : {
            "sorted": boolean,
            "unsorted" : boolean,
            "empty" : boolean
        },
        numberOfElements : number,
        first : boolean,
        empty : boolean
        ){}




}