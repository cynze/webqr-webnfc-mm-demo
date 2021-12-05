import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { MediaService } from '../../services/media.service';
import { Media } from '../../models/media';
import { take } from 'rxjs/operators';

export enum MediaIdEnum {
  image = 'image',
  video = 'video',
  audio = 'audio',
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {

  @Input()
  mediaId$?: Observable<string>;
  mediaId: string;
  mediaIdEnum = MediaIdEnum;
  mediaImages: Media[];
  mediaVideos: Media[];
  media$: Observable<Media>;
  image: Observable<Media>;
  video: Observable<Media>;
  audio: Observable<Media>;

  constructor(public toastController: ToastController, private mediaService: MediaService) {
  }

  async ngOnInit() {
    this.mediaImages = await this.mediaService.getImages().toPromise();
    this.mediaVideos = await this.mediaService.getVideos().toPromise();

    this.mediaId = await this.mediaId$.toPromise();

    if (this.mediaId.startsWith(this.mediaIdEnum.image)) {
      const imageArray = await this.mediaService.getImage(this.mediaId.slice(6)).toPromise();
      this.image = of(imageArray[0]);
    }

    if (this.mediaId.startsWith(this.mediaIdEnum.video)) {
      const videoArray = await this.mediaService.getVideo(this.mediaId.slice(6)).toPromise();
      this.video = of(videoArray[0]);
    }

    if (this.mediaId.startsWith(this.mediaIdEnum.audio)) {
      const audioArray = await this.mediaService.getAudio(this.mediaId.slice(6)).toPromise();
      this.audio = of(audioArray[0]);
    }
    this.showMedia();
  }

  showMedia() {
    if (this.mediaId) {
      if (this.mediaId.startsWith(this.mediaIdEnum.image)) {
        this.media$ = of(this.mediaImages.find(m => m.public_id === `ImageUploads/${this.mediaId.slice(6)}`));
      } else if (this.mediaId.startsWith(this.mediaIdEnum.video)) {
        this.media$ = of(this.mediaVideos.find(m => m.public_id === `VideoUploads/${this.mediaId.slice(6)}`));
      } else if (this.mediaId.startsWith(this.mediaIdEnum.audio)) {
        this.media$ = of(this.mediaVideos.find(m => m.public_id === `AudioUploads/${this.mediaId.slice(6)}`));
      } else {
        this.invalidIdToast();
      }
    }

    this.media$?.pipe(take(1)).subscribe(m => {
        if (this.mediaId$ && m === undefined) {
          this.invalidIdToast();
        }
      }
    );
  }

  async invalidIdToast() {
    const toast = await this.toastController.create({
      message: 'invalid id',
      color: 'danger',
      duration: 3000
    });
    await toast.present();
  }
}
