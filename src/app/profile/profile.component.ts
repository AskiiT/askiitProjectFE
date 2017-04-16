import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { DomSanitizer}from '@angular/platform-browser'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService ]
})
export class ProfileComponent implements OnInit {

    public usernameParam: String;
    response$;
    userData: any;
    rankData:any;

    percentq:any;
    percente:string;
    percentc:any;

    constructor(private route: ActivatedRoute, private uService: UserService ) {

        this.route.params.subscribe(
            params => {
                this.usernameParam = params[ 'user' ],
                this.subscribeData( )
            }
        );

        this.usernameParam = route.snapshot.params[ 'user' ];
    }

    ngOnInit( ) {
    	this.subscribeData( );
    }

    subscribeData( ) {
    	this.response$ = this.uService.getUserByUsername( this.usernameParam );

    	this.response$.subscribe(
    		res => {
                this.userData = res[ 0 ],
                this.percente = ( String( this.userData.rank.efectiveness * 100 / 5741 ) + '%' ),
                this.percentc = ( String( this.userData.rank.clarity * 100 / 5741 ) + '%' ),
                this.percentq = ( String( this.userData.rank.quickness * 100 / 5741 ) + '%' )
            },
    		() => {},
    		() => console.log( "OK: user completed!" )
    	);
    }


}
