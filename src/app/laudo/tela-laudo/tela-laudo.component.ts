import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-laudo',
  templateUrl: './tela-laudo.component.html',
  styleUrls: ['./tela-laudo.component.css']
})
export class TelaLaudoComponent implements OnInit {
  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

  constructor() { }

  ngOnInit() {
  }

}
