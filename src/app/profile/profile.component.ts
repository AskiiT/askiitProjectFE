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
    percente:any;
    percentc:any;

    constructor(private route: ActivatedRoute, private uService: UserService,private sanitizer: DomSanitizer) {
        this.usernameParam = route.snapshot.params[ 'user' ];
        this.percentq = sanitizer.bypassSecurityTrustStyle(this.percentq);
    }

    ngOnInit( ) {
    	this.subscribeData( )
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
        res => this.rankData = res[0],
        () => {},
        () => console.log(this.rankData)
      );
    }


}
