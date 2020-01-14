import { InstanceService } from './../../zservice/instance.service';
import { Instance, TagImagemGamb } from './../../core/model';
import { ServidorService } from './../../zservice/servidor.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { Router, ActivatedRoute } from '@angular/router';
import dicomParser from 'dicom-parser';

const config = {
  webWorkerPath: '/assets/cornerstoneWADOImageLoaderWebWorker.js',
  taskConfiguration: {
      'decodeTask': {
          codecsPath: '/assets/cornerstoneWADOImageLoaderCodecs.js'
      }
  }
};

cornerstoneWADOImageLoader.webWorkerManager.initialize(config);

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  display: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ServidorService) { }

  ngOnInit() {
    const idinstance = this.route.snapshot.params.cod;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    if (idinstance) {
      this.NgAfterViewInit(idinstance);
    }


  }

  showDialog() {
    this.display = true;
  }

  NgAfterViewInit(instanceuid: string) {
    const element = document.querySelector('.image-canvas');
    const DCMPath = this.service.BuscarUrlBuscaImagem(instanceuid);
    cornerstone.enable(element);

    cornerstone.loadAndCacheImage('wadouri:' + DCMPath).then(imageData => {
      cornerstone.displayImage(element, imageData);
    }).catch( error => { console.error(error); });
    // cornerstoneWADOImageLoader.wadouri.fileManager.remove(imageID);
  }


}
