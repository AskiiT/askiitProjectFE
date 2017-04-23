import {Component, OnInit} from '@angular/core';
import {AskiitComponent} from '../askiit/askiit.component';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openAskiit() {
    let dialogRef = this.dialog.open(AskiitComponent,{
      height: '420px',
      width: '1000px'
    });
    dialogRef.afterClosed();
  }

}
