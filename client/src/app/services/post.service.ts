import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.model';
import { HttpClient } from '@angular/common/http';
import { serverConfig } from '../config/server-config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private endpoint = serverConfig.baseUrl + 'post';

  constructor (private http: HttpClient) { }

  getPosts () {
    return this.http.get<Post[]>(`${this.endpoint}/get`);
  }

  getPostById (id: number) {
    return this.http.get<Post>(`${this.endpoint}/${id}/get`)
  }

  getPostsByUserId (id: number) {
    return this.http.get<Post[]>(`${this.endpoint}/get/user/${id}`)
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
