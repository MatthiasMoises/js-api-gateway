import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.model';
import { User } from 'src/app/interfaces/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userId: number = 0;
  private sub: any;
  user: User | null = null;
  posts: Post[] = [];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit () {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['id'];

      this.fetchUserDetails();
      this.fetchUserPosts();
    }, err => {
      console.log(err)
    });
  }

  fetchUserDetails () {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    })
  }

  fetchUserPosts () {
    this.postService.getPostsByUserId(this.userId).subscribe(posts => {
      this.posts = posts;
    })
  }

  navigateBackToList () {
    this.router.navigate(['/users']);
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

}
