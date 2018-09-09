import {Component, OnInit} from '@angular/core';
import {ChatService, Status} from "../../services/chat.service";
import {VideoService} from "../../services/video.service";
import {Router} from "@angular/router";
import {IMAGES} from "../../constants/assets.constants";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  IMAGES = IMAGES;

  Status = Status;
  status: Status = Status.IDLE;

  message: string = '';

  constructor(
    private router: Router,
    private videoService: VideoService,
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.chatService.state$.subscribe(status => {
      this.status = status;

      if (status === Status.RECEIVING) {
        this.message = 'Receiving...';
      } else if (status === Status.CALLING) {
        this.message = 'Calling...';
      }
    })
  }

  async answerCall() {
  }

  endCall() {
    this.chatService.endCall();
  }

}
