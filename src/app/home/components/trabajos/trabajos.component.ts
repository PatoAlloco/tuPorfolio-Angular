import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {
  @Input() usuario:any;

  constructor() {

  }

  ngOnInit(): void {

  }

}
