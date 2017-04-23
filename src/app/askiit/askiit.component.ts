import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-askiit',
  templateUrl: './askiit.component.html',
  styleUrls: ['./askiit.component.css']
})
export class AskiitComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AskiitComponent>) { }

  ngOnInit() {
  }

}
