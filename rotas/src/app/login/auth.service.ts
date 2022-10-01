import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmmiter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {

    if (usuario.nome === 'eren@email.com' && usuario.senha === '123') {

      this.usuarioAutenticado = true;
      this.mostrarMenuEmmiter.emit(true);

      this.router.navigate(['/']);

    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmmiter.emit(false);
    }
  }
}
