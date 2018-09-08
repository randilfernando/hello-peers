import {Injectable} from '@angular/core';

declare let navigator: any;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private getDisplayMedia = navigator.getUserMedia;
  private mediaStream: any;

  constructor() {
  }

  public async openVideoStream(): Promise<any> {
    this.mediaStream = await this.getUserMedia({audio: true, video: true});
    return this.mediaStream;
  }

  public async closeVideoStream(): Promise<any> {
    this.mediaStream.getTracks().forEach(track => track.stop());
  }

  private getUserMedia(options: {audio: boolean, video: boolean}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.getUserMedia(options, function (s) {
        resolve(s);
      }, function (err) {
        reject(err);
      });
    });
  }
}
