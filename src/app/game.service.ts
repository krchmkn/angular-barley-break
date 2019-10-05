import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _maxBonesInRow = 4;
  private _isMoving = false;

  private _bones = new BehaviorSubject([]);
  private _step = new BehaviorSubject(0);
  private _isStarted = new BehaviorSubject(false);
  private _isFinished = new BehaviorSubject(false);

  bones;
  step;
  isStarted;
  isFinished;

  constructor() {
    this.bones = this._bones.asObservable();
    this.step = this._step.asObservable();
    this.isStarted = this._isStarted.asObservable();
    this.isFinished = this._isFinished.asObservable();

    this.fillBones();
  }

  fillBones(itemsCount: number = 15) {
    // if has the remainder
    // it means itemsCount is incorrect
    if ((itemsCount + 1) % this._maxBonesInRow) {
      return;
    }

    const arr = Array.from(Array(itemsCount).keys(), i => i + 1);
    arr.push(0);

    this._bones.next(arr);
  }

  getBonesValue() {
    // used spread operator
    // because this._bones.getValue() return value by link
    return [...this._bones.getValue()];
  }

  shuffleArray(array): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startGame(bonesToShuffle?: number): void {
    let result;
    const bones = this.getBonesValue();
    if (bonesToShuffle && bonesToShuffle < bones.length) {
      const shuffledPart = this.shuffleArray(
        bones.slice(bones.length - bonesToShuffle, bones.length)
      );
      bones.splice(bones.length - bonesToShuffle, bonesToShuffle, ...shuffledPart);
      result = bones;
    } else {
      result = this.shuffleArray(this.getBonesValue());
    }

    this._bones.next(result);
    this._isStarted.next(true);
    this._step.next(0);

    if (this._isFinished.getValue()) {
      this._isFinished.next(false);
    }
  }

  getBonesCount(): number {
    return this.getBonesValue().length;
  }

  moveBone(bone: number): void {
    if (!bone
      || !this._isStarted.getValue()
      || this._isMoving
    ) {
      return;
    }

    this._isMoving = true;

    const bones = this.getBonesValue();
    const boneIndex = bones.indexOf(bone);
    const emptyIndex = bones.indexOf(0);

    if (boneIndex === (emptyIndex + 1)
      || boneIndex === (emptyIndex - 1)
      || boneIndex === (emptyIndex + this._maxBonesInRow)
      || boneIndex === (emptyIndex - this._maxBonesInRow)
    ) {
      bones[emptyIndex] = bone;
      bones[boneIndex] = 0;
      this._bones.next(bones);
      this._step.next(this._step.getValue() + 1);
    }

    this._isMoving = false;
    this.checkGameStatus();
  }

  checkGameStatus() {
    const bones = this.getBonesValue();
    const bonesStandard = [...bones].sort((a, b) => a - b);
    bonesStandard.shift();
    bonesStandard.push(0);

    if (bones.join('') === bonesStandard.join('')) {
      this._isStarted.next(false);
      this._isFinished.next(true);
    }
  }
}
