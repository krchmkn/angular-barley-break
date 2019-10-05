import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit, OnDestroy {

  bones: Array<number>;
  step: number;
  isGameStarted: boolean;
  bonesCount: number;

  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this._gameService.bones.subscribe(val => {
      this.bones = val;
      this.bonesCount = val.length - 1;
    });
    this._gameService.step.subscribe(val => this.step = val);
    this._gameService.isStarted.subscribe(val => this.isGameStarted = val);
  }

  ngOnDestroy() {
    this._gameService.bones.unsubscribe();
    this._gameService.step.unsubscribe();
    this._gameService.isStarted.unsubscribe();
  }

  moveBone(bone: number): void {
    this._gameService.moveBone(bone);
  }
}
