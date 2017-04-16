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
    response1$;
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
        this.response1$ = this.uService.getRankByUsername( this.usernameParam );

    	this.response$.subscribe(
    		res => this.userData = res[ 0 ],
    		() => {},
    		() => console.log( "OK: user completed!" )
    	);

        this.response1$.subscribe(
            res => { this.rankData = res[0],
            this.percente = ( String( this.rankData.efectiveness * 100 / 5741 ) + '%' ),
            this.percentc = ( String( this.rankData.clarity * 100 / 5741 ) + '%' ),
            this.percentq = ( String( this.rankData.quickness * 100 / 5741 ) + '%' ) },
            () => {},
            () => console.log( "OK: rank completed" )
        );
    }


}
