import { Hammer } from 'hammerjs';
import { InstanceService, ResumoInstance } from './../../zservice/instance.service';
import { ServidorService } from './../../zservice/servidor.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { Router, ActivatedRoute } from '@angular/router';
import dicomParser from 'dicom-parser';
import {Location} from '@angular/common';

const config = {
  webWorkerPath: '/assets/cornerstoneWADOImageLoaderWebWorker.js',
  taskConfiguration: {
      decodeTask: {
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
  display: boolean;
  instance = ResumoInstance;
  activeBtn: any;
  @ViewChild('fullScreen', { static: false }) divRef;
  studyId: any;
  seriesId: any;
  imageStudy = {};
  selectedinstanceId = '';
  selectedInstanceModel = {};
  selectedInstanceImg: any;
  instancesTotlaCount: any;
  listDicomTags: any[];
  dicomTags: object;
  currentURL = '';
  notesList: any;
  state: string;
  subjecttext: string;
  messagetext = 'Request you to comment on the study images';
  selectedItem: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: ServidorService,
              private serviceInst: InstanceService,
              private location: Location) { }

  ngOnInit() {
    const idinstance = this.route.snapshot.params.cod;
    this.ConfigurarDicomInicial();

    this.BuscarInstanciaResumida(idinstance);
    console.log('codigo instance' + this.instance);
  }

  ConfigurarDicomInicial() {
  //  cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    cornerstoneTools.init();
  }

  showDialog() {
    this.display = true;

  }

  BuscarInstanciaResumida(idinstance: number) {
    return this.serviceInst.ResumoProDicom(idinstance)
      .then(
        instance => {
          this.instance = instance;
          this.initDiacomToolsForImages();
          this.NgAfterViewInit(instance.mediastoragesopinstanceuid);
        }
      );
  }

  NgAfterViewInit(instanceuid: string) {
    const element = document.querySelector('.image-canvas');
    const DCMPath = this.service.BuscarUrlBuscaImagem(instanceuid);
    cornerstone.enable(element);

    cornerstone.loadAndCacheImage('wadouri:' + DCMPath).then(imageData => {
      cornerstone.displayImage(element, imageData);
    }).catch( error => { console.error(error); });
  }


  public initDiacomToolsForImages() {
    const that = this;
    let itemsProcessed = 0;

    const imageId = 'image-canvas';
    const diacomImageElement = document.getElementById(imageId);
    cornerstone.enable(diacomImageElement);
    const PanTool = cornerstoneTools.PanTool;

    cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
    cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
    cornerstoneTools.addTool(cornerstoneTools.PanTool);
    cornerstoneTools.addTool(cornerstoneTools.AngleTool);
    cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
    cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);
    const configuration = {
      markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
      current: 'F5',
      ascending: true,
      loop: true,
    };
    cornerstoneTools.addTool(cornerstoneTools.TextMarkerTool, { configuration });
    itemsProcessed++;
  }

  public enableTools(tool: string, imageName: string, ) {
    const diacomImageElement = document.getElementById('image-canvas');
    if (tool === 'bright') {
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    }
    if (tool === 'zoom') {
      cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    }
    if (tool === 'pan') {
      cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    }
    if (tool === 'angle') {
      cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
    }
    if (tool === 'rectangleRoi') {
      cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 });
    }
    if (tool === 'invert') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.invert = !viewport.invert;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'elliptical') {
      const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
      cornerstoneTools.addTool(EllipticalRoiTool);
      cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 });
    }
    if (tool === 'bi-directional') {
      const BidirectionalTool = cornerstoneTools.BidirectionalTool;
      cornerstoneTools.addTool(BidirectionalTool);
      cornerstoneTools.setToolActive('Bidirectional', { mouseButtonMask: 1 });
    }
    if (tool === 'arrow-annotation') {
      const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
      cornerstoneTools.addTool(ArrowAnnotateTool);
      cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
    }
    if (tool === 'dragprobe') {
      const DragProbeTool = cornerstoneTools.DragProbeTool;
      cornerstoneTools.addTool(DragProbeTool);
      cornerstoneTools.setToolActive('DragProbe', { mouseButtonMask: 1 });
    }
    if (tool === 'probe') {
      const ProbeTool = cornerstoneTools.ProbeTool;
      cornerstoneTools.addTool(ProbeTool);
      cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 });
    }
    if (tool === 'length') {
      const LengthTool = cornerstoneTools.LengthTool;
      cornerstoneTools.addTool(LengthTool);
      cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
    }
    if (tool === 'cobb') {
      const CobbAngleTool = cornerstoneTools.CobbAngleTool;
      cornerstoneTools.addTool(CobbAngleTool);
      cornerstoneTools.setToolActive('CobbAngle', { mouseButtonMask: 1 });
    }
    if (tool === 'magnify') {
      cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
    }
    if (tool === 'text') {
      cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
    }
    if (tool === 'rotate') {
      const RotateTool = cornerstoneTools.RotateTool;
      cornerstoneTools.addTool(RotateTool);
      cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
    }
    if (tool === 'hFlip') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.hflip = !viewport.hflip;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'vFlip') {
      const viewport = cornerstone.getViewport(diacomImageElement);
      viewport.vflip = !viewport.vflip;
      cornerstone.setViewport(diacomImageElement, viewport);
    }
    if (tool === 'reset') {
      cornerstone.reset(diacomImageElement);
    }
  }

  openFullscreen() {
    const elem = this.divRef.nativeElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }


  backClicked() {
    this.location.back();
  }

  btnActive(check) {
    if (check === 'pan') {
      this.activeBtn = 'pan';
    } else if (check === 'zoom') {
      this.activeBtn = 'zoom';
    } else if (check === 'annotate') {
      this.activeBtn = 'annotate';
    } else if (check === 'rotateDDL') {
      this.activeBtn = 'rotateDDL';
    }  else if (check === 'magnify') {
      this.activeBtn = 'magnify';
    } else if (check === 'windowningDDL') {
      this.activeBtn = 'windowningDDL';
    } else if (check === 'dragprobe') {
      this.activeBtn = 'dragprobe';
    } else if (check === 'fullscreen') {
      this.activeBtn = 'fullscreen';
    } else if (check  === 'reset') {
      this.activeBtn = 'reset';
    }

  }

}
