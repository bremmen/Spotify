import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token: string;
  constructor( private http: HttpClient) { }
  
  // OBTENGO EL TOKEN.
  getToken(){
    // tslint:disable-next-line: max-line-length
    return this.http.get("https://spotify-get-token.herokuapp.com/spotify/aeff96a10b5b4be1be163889945e1b76/3df1e883cbe44d5dbcd1d1d77da5b46b");
  }


  // SENTRALIZACION DE LAS QUERYS
   getQuery( query: string){

    this.getToken().subscribe((res: any) => {
      console.log(res);
      this.token = res.access_token;
    });
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`
          /* 'Authorization': 'Bearer BQD6XbV5Jy_HmazngeRH2tIYc8RhcM4w3eUgvz8dz-3py7IYMkcZIhGyDE8Zr9YAKeNVSS81rPpO6c0zlj0' */
    });

    return this.http.get(url, {headers});
   }

   // OBTENGO LOS NUEVOS LANZAMIENTOS DEL SERVICIO DE SPOTIFY
  getNewReleases(){
    return this.getQuery('browse/new-releases')
               .pipe( map( data => data['albums'].items));
  }

  // OBTENGO LOS ARTISTAS BUSCADOS DEL SERVICIO DE SPOTIFY
  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
               .pipe(map (data => data['artists'].items));
  }
  // OBTENGO UN ARTISTA ESPECIFICO DEL SERVICIO DE SPOTIFY.
  getArtista(id: string){
    return this.getQuery(`artists/${id}`);
  }
  // OBTENGO LOS TRAKS DE SPOTIFY SERVICE
  getTopTraks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map (data => data['tracks']));
  }
}
