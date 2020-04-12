import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: [
  ]
})
export class TarjetasComponent{

  // Recivo los items de los servicios enviados desde home o search.
  @Input() items: any [] = [];

  constructor( private router: Router) { }

  verArtista(item: any){ // Evento para obtener el id del artista
    let artistaId;
    // verifico si el objeto es de tipo album o artista.
    if (item.type === 'artist') {
      artistaId = item.id;
    }else{
      artistaId = item.artists[0].id;
    }
    this.router.navigate(['artist', artistaId]); // navego hasta el componente artista y mando el ID del artista.
  }
}
