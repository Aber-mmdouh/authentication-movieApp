import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Imovies } from './imovies';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-movie',
  imports: [CommonModule],
  templateUrl: './movie.html',
  styleUrl: './movie.css',
})

export class Movie implements OnInit {

  movies=signal<Imovies[]>([])
   IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
   SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
 API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

  private http = inject(HttpClient)
  getMovies(url:string) {

return this.http.get<Imovies[]>(url)
}
ngOnInit() {
   this.getMovies(this.API_URL).subscribe((data:any)=>{
  this.movies.set(data.results)

})}
submit(search:string){
  if(search){
    this.getMovies(this.SEARCH_API+search).subscribe((data:any)=>{
      this.movies.set(data.results)
    })
  }else{
    window.location.reload()
  }
  }

  }

