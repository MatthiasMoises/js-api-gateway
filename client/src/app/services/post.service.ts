import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private endpoint = 'http://localhost:8000/post';

  constructor (private http: HttpClient) { }

  getPosts () {
    return this.http.get<Post[]>(`${this.endpoint}/get`);
  }

  getPostById (id: number) {
    return this.http.get<Post>(`${this.endpoint}/${id}/get`)
  }

  createPost (post: Post) {
    return this.http.post(`${this.endpoint}/create`, post)
  }

  updatePOst (post: Post) {
    return this.http.put(`${this.endpoint}/${post.id}/update`, post)
  }

  deletePost (id: number) {
    return this.http.delete(`${this.endpoint}/${id}/delete`)
  }
}
