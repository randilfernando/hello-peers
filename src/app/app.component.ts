import {Component} from '@angular/core';
import {ChatService, Status} from "./services/chat.service";
import {Router} from "@angular/router";
import {LOCAL_STORAGE} from "./constants/storage.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hello-peers';

  constructor(
    private router: Router,
    private chatService: ChatService
  ) {
    chatService.state$.subscribe(status => {
      if (status === Status.CALL_DISCONNECTED) {
        this.router.navigate(['/home']);
      } else if (status === Status.ERROR) {
        this.router.navigate(['/home']);
      } else if (status === Status.RECEIVING) {
        this.router.navigate(['/chat']);
      } else if (status === Status.DISCONNECTED) {
        this.chatService.reconnect();
      } else if (status === Status.CLOSE) {
        this.router.navigate(['/login']);
      }
    });

    if (localStorage.getItem(LOCAL_STORAGE.MY_PEER)) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register'])
    }
  }
}
