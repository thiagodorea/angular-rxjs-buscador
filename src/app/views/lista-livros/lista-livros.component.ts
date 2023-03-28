import { Item, LivroResultado } from './../../models/interfaces';
import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { switchMap, map, tap, filter, debounceTime, distinctUntilChanged, catchError, throwError, EMPTY, of } from 'rxjs';
import { FormControl } from '@angular/forms';

const PAUSE = 1000;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl();
  mensagemErro: string ='';
  livrosResultado: LivroResultado;

  constructor(
    private service: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSE),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valoDigitado) => this.service.buscar(valoDigitado)),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      this.mensagemErro = 'Ops, ocorreu un erro. Recarregue a aplicação.'
      return EMPTY
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }


}



