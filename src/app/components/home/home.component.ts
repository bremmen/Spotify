import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean; // propiedad para mostrar el componente loading
  error: boolean;
  mensaje: string;

  constructor(private spotify: SpotifyService) {
    this.loading = false;
    this.error = false;
    this.spotify.getNewReleases()
        .subscribe((data: any) =>{
          this.nuevasCanciones = data;
          this.loading = true;
        }, (errorServicio) => {
          this.error = true;
          this.loading = true;
          this.mensaje = errorServicio.error.error.message;
        });

   }

  ngOnInit(): void {
  }

}
