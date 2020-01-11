import { ServidorService } from './../../zservice/servidor.service';
import {Component, OnInit} from '@angular/core';
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

  constructor(private router: Router, private route: ActivatedRoute, private service: ServidorService) { }

  ngOnInit() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    this.NgAfterViewInit();
  }

  NgAfterViewInit() {
    const element = document.querySelector('.image-canvas');
    const DCMPath = this.service.BuscarUrlBuscaImagem();
    cornerstone.enable(element);

    cornerstone.loadAndCacheImage('wadouri:' + DCMPath).then(imageData => {
      console.log(imageData);
      cornerstone.displayImage(element, imageData);
    }).catch( error => { console.error(error); });
    // cornerstoneWADOImageLoader.wadouri.fileManager.remove(imageID);
  }



}
