import { ConvenioService } from './../../zservice/convenio.service';
import { Convenio } from 'src/app/core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-convenio',
  templateUrl: './card-convenio.component.html',
  styleUrls: ['./card-convenio.component.css']
})
export class CardConvenioComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('conv') convenio: Convenio;
  val: number = 5;

  constructor(private service: ConvenioService) { }

  ngOnInit() {
  }

}
