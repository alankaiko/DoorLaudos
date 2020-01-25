import { ServidorService } from './../../zservice/servidor.service';
import { Component, OnInit } from '@angular/core';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

const imageId = 'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg';

const divStyle = {
  width: '512px',
  height: '512px',
  position: 'relative',
  color: 'white'
};

const bottomLeftStyle = {
  bottom: '5px',
  left: '5px',
  position: 'absolute',
  color: 'white'
};

const bottomRightStyle = {
  bottom: '5px',
  right: '5px',
  position: 'absolute',
  color: 'white'
};

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  constructor(private service: ServidorService) {}

  ngOnInit() {
    this.Ativar();
    cornerstone.registerImageLoader('myCustomLoader', this.loadImage);
    cornerstone.loadImage('myCustomLoader://example.com/image.dcm');
  }

  Ativar() {
    const instancia = '1.2.840.114244.400.5.3098239328.194271026.28453';
    const DCMPath = this.service.BuscarUrlBuscaImagem(instancia);
    const divdesenho = document.querySelector('.desenho');
    cornerstone.enable(divdesenho);
    cornerstone.loadAndCacheImage('wadouri:' + DCMPath).then(imageData => {
      cornerstone.displayImage(divdesenho, imageData);
    }).catch( error => { console.error(error); });
  }

  loadImage() {
    const instancia = '1.2.840.114244.400.5.3098239328.194271026.28453';
    // Parse the imageId and return a usable URL (logic omitted)
    const url = this.service.BuscarUrlBuscaImagem(instancia);

    // Create a new Promise
    const promise = new Promise((resolve, reject) => {
      // Inside the Promise Constructor, make
      // the request for the DICOM data
      const oReq = new XMLHttpRequest();
      oReq.open("get", url, true);
      oReq.responseType = "arraybuffer";
      oReq.onreadystatechange = function(oEvent) {
          if (oReq.readyState === 4) {
              if (oReq.status == 200) {
                  // Request succeeded, Create an image object (logic omitted)
                  // const image = createImageObject(oReq.response);

                  // Return the image object by resolving the Promise
                 // resolve(image);
              } else {
                  // An error occurred, return an object containing the error by
                  // rejecting the Promise
                  reject(new Error(oReq.statusText));
              }
          }
      };

      oReq.send();
    });

    // Return an object containing the Promise to cornerstone so it can setup callbacks to be
    // invoked asynchronously for the success/resolve and failure/reject scenarios.
    return {
      promise
    };
  }
}
