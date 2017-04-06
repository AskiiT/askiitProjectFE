import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

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

    constructor(private route: ActivatedRoute, private uService: UserService) {
        this.usernameParam = route.snapshot.params[ 'user' ];
    }

    ngOnInit( ) {
    	this.subscribeData( )
   }

    subscribeData( ) {
    	this.response$ = this.uService.getUserByUsername( this.usernameParam );

    	this.response$.subscribe( 
    		res => this.userData = res[ 0 ],
    		() => {},
    		() => console.log( "OK: user completed!" )
    	);
    }


}
