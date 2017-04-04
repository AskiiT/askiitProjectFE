import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: String;

  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.params['user'];
  }

  ngOnInit() {
  }

}
