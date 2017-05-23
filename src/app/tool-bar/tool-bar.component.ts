import { Component, OnInit } from '@angular/core';
import { AskiitComponent } from '../askiit/askiit.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from  '../user.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  providers: [ UserService ]
})
export class ToolBarComponent implements OnInit {

    userData;

  constructor( public dialog: MdDialog, private authService: AuthService, private router: Router,
    private uService: UserService, private ngRedux: NgRedux<IAppState> ) {
        this.ngRedux.select( 'authUserData' ).subscribe(
            ( val ) => {
                this.userData = val;
            }
        )
    }

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
            if( res.status == 200 ) {
                this.uService.logoutToFirebase( );
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
