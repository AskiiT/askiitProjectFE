import { Component, OnInit } from '@angular/core';
import { AskiitComponent } from '../askiit/askiit.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor( public dialog: MdDialog, private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  openAskiit() {
    let dialogRef = this.dialog.open(AskiitComponent,{
      height: '485px',
      width: '1000px'
    });
    dialogRef.afterClosed();
  }

  logOut( ) {
      this.authService.logOutUser( ).subscribe(
          res => {
            if( res.status == 200 ){
                console.log( 'Successfull log out.' );
                this.router.navigate( ['/'] );
            }
          },
          err => {
            alert( err );
          }
      );
  }

}
