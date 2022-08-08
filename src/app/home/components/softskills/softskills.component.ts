import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-softskills',
  templateUrl: './softskills.component.html',
  styleUrls: ['./softskills.component.css']
})
export class SoftskillsComponent implements OnInit {
  @Input() usuario:any;
  
  constructor() { }

  ngOnInit(): void {

  }

}
