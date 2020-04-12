import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // verifico cual es la ruta activa
import { SpotifyService } from '../../services/spotify.service';// importo el serviio de spotify


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
})
export class ArtistaComponent {

  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];
  constructor( private router: ActivatedRoute,
               private spotify: SpotifyService) {
    this.loading = true;
    this.router.params.subscribe(params => { // RECIBO EL ID DEL ARTISTA ENVIADO DESDE LA TARJETA
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });

  }
  // obtengo el artista desde spotify.service.ts
  getArtista(id: string){
    this.loading = true;
    this.spotify.getArtista(id)
                .subscribe (artista =>{
                  console.log(artista);
                  this.artista = artista; // paso el artista que resivo del servicio a mi variable local
                  this.loading = false;
                });
  }

  getTopTracks(id: string){
    this.spotify.getTopTraks(id)
                .subscribe(toptracks =>{
                  console.log(toptracks);
                  this.topTracks = toptracks;
                });
  }
}
