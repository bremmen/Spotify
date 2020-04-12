import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  error: boolean;
  mensaje: string;
  artistas: any[] = [];
  loading: boolean;
  constructor( private spotify: SpotifyService) { }
  buscar(termino: string){
    this.loading = true;

    if (termino !== ''){ // verifico que el termino no se mande vacio.
      this.spotify.getArtistas(termino)
        .subscribe((data: any) => {
          this.artistas = data;
          this.loading = false;
        }, (errorServicio) => {
          this.loading = false;
          this.error = true;
          this.mensaje = errorServicio.error.error.message;
        });
    }
    else{
      this.loading = false;
    }
  }
}
