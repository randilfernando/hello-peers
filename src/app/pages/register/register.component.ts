import {Component, OnInit} from '@angular/core';
import {IMAGES} from "../../constants/assets.constants";
import {Router} from "@angular/router";
import {PeerType} from "../../types/peerType";
import {PeerService} from "../../services/peer.service";
import {LOCAL_STORAGE} from "../../constants/storage.constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  IMAGES = IMAGES;

  peer: PeerType = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private peerService: PeerService
  ) {
  }

  ngOnInit() {
  }

  register() {
    this.peerService.register(this.peer);
    this.router.navigate(['/login']);
  }

}
