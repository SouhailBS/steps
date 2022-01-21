import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Author} from "../models/author";
import {environment} from "../../environments/environment";
import {Type} from "../models/type";
import {User} from "../models/user";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(
      environment.apiUrl + '/authors', {observe: 'body'});
  }

  addAuthor(name: string): Observable<Author> {
    return this.http.post<Author>(
      environment.apiUrl + '/authors', {name}, {observe: 'body'});
  }

  editAuthor(name: string, id: string) {
    return this.http.put<Author>(
      environment.apiUrl + '/authors/' + id, {name}, {observe: 'body'});
  }

  deleteAuthor(id: string) {
    return this.http.delete(
      environment.apiUrl + '/authors/' + id, {observe: 'body'});
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(
      environment.apiUrl + '/types', {observe: 'body'});
  }

  addType(name: string): Observable<Type> {
    return this.http.post<Type>(
      environment.apiUrl + '/types', {name}, {observe: 'body'});
  }

  editType(name: string, id: string) {
    return this.http.put<Type>(
      environment.apiUrl + '/types/' + id, {name}, {observe: 'body'});
  }

  deleteType(id: string) {
    return this.http.delete(
      environment.apiUrl + '/types/' + id, {observe: 'body'});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      environment.apiUrl + '/users', {observe: 'body'});
  }

  addUser(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(
      environment.apiUrl + '/users', {name, email, password}, {observe: 'body'});
  }

  editUser(id: string, name: string, email: string, password?: string) {
    return this.http.put<User>(
      environment.apiUrl + '/users/' + id, {name, email, password}, {observe: 'body'});
  }

  deleteUser(id: string) {
    return this.http.delete(
      environment.apiUrl + '/users/' + id, {observe: 'body'});
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(
      environment.apiUrl + '/books', {observe: 'body'});
  }

  addBook(title: string, type: string, author: string, published_at: Date): Observable<Book> {
    return this.http.post<Book>(
      environment.apiUrl + '/books', {title, type, author, published_at}, {observe: 'body'});
  }

  editBook(id: string, title: string, type: string, author: string, published_at: Date) {
    return this.http.put<Book>(
      environment.apiUrl + '/books/' + id, {title, type, author, published_at}, {observe: 'body'});
  }

  deleteBook(id: string) {
    return this.http.delete(
      environment.apiUrl + '/books/' + id, {observe: 'body'});
  }
}
