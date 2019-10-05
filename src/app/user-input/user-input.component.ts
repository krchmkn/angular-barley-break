import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit, OnDestroy  {

  bonesCount: number;
  bonesToShuffle: number;
  form: FormGroup;

  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this._gameService.bones.subscribe(val => this.bonesCount = val.length - 1);
    this.bonesToShuffle = this.bonesCount;

    this.form = new FormGroup({
      bonesCount: new FormControl(this.bonesCount, [
        Validators.required,
        Validators.max(99),
        this.bonesCountValidator
      ]),
      bonesToShuffle: new FormControl(this.bonesToShuffle, [
        Validators.required,
        Validators.min(1)
      ])
    }, [ this.formGroupValidator ]);
  }

  ngOnDestroy() {
    this._gameService.bones.unsubscribe();
  }

  bonesCountValidator(c: FormControl): { [error: string]: any } | null {
    return (c.value + 1) % 4 === 0 ? null : { bonesCount: { valid: false } };
  }

  formGroupValidator(fg: FormGroup): { [error: string]: any } | null {
    if (fg.value.bonesToShuffle > fg.value.bonesCount) {
      return { bonesToShuffle: { valid: false } };
    }
    return null;
  }

  onSubmit() {
    if (this.form.value.bonesCount !== this._gameService.getBonesCount()) {
      this._gameService.fillBones(this.form.value.bonesCount);
    }

    this._gameService.startGame(this.form.value.bonesToShuffle);
  }
}
