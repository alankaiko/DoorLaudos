import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-laudo',
  templateUrl: './tela-laudo.component.html',
  styleUrls: ['./tela-laudo.component.css']
})
export class TelaLaudoComponent implements OnInit {
  text1: string = '<div>Teste Base!</div><div>Base</div><div><br></div>';

  constructor() { }

  ngOnInit() {
  }

}
