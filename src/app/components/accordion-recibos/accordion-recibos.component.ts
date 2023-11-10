import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-recibos',
  templateUrl: './accordion-recibos.component.html',
  styleUrls: ['./accordion-recibos.component.scss']
})
export class AccordionRecibosComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public singleBranchExpand = false;
}
