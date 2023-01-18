import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userId: number = 0;
  private sub: any;

  constructor (private route: ActivatedRoute) { }

  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['id'];

      console.log(this.userId)
    });
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

}
