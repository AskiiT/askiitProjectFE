import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-postulated',
  templateUrl: './postulated.component.html',
  styleUrls: ['./postulated.component.css']
})
export class PostulatedComponent implements OnInit {

  constructor( public dialogRef: MdDialogRef<PostulatedComponent> ) { }

  ngOnInit() {
  }

}
