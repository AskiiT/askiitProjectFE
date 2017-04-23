import {Component, OnInit} from '@angular/core';
import {AskiitComponent} from '../askiit/askiit.component';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  selectedOption: string;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(AskiitComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

}
