import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  beforeEach(() => { service = new GameService(); });

  it('#fillBones should fill array', () => {
    service.fillBones(15);
    service.bones.subscribe(val => {
      expect(val.length).toBeTruthy();
    });
  });

  it('#getBonesValue should return array', () => {
    const arr = service.getBonesValue();
    expect(Array.isArray(arr)).toBe(true);
  });

  it('#shuffleArray should randomize array', () => {
    const arr = [1, 2, 3];
    const arr2 = service.shuffleArray([...arr]);
    expect(arr.join('') !== arr2.join('')).toBe(true);
  });

  it('#startGame should shuffle bones', () => {
    service.bones.subscribe(val => {
      expect(val.join('') !== val.sort().join('')).toBe(true);
    });
    service.fillBones(15);
    service.startGame();
  });

  it('#startGame should set isStarted to true', () => {
    let result;
    service.isStarted.subscribe(val => {
      result = val;
    });
    service.fillBones(15);
    service.startGame();
    expect(result).toBe(true);
  });

  it('#getBonesCount chould return number', () => {
    expect(isNaN(service.getBonesCount())).toBe(false);
  });

  it('#moveBone should change bone position', () => {
    let result;
    let emptyIndex;
    const snapshot = [];
    service.bones.subscribe(val => {
      emptyIndex = val.indexOf(0);
      result = val;
      snapshot.push(val);
    });
    service.fillBones(15);
    service.startGame(3);
    service.moveBone(result[emptyIndex - 1]);
    expect(
      snapshot[snapshot.length - 2].indexOf(0) !== snapshot[snapshot.length - 1].indexOf(0)
    ).toBe(true);
  });

  it('#moveBone should increase step', () => {
    let result;
    let emptyIndex;
    let step;
    service.bones.subscribe(val => {
      emptyIndex = val.indexOf(0);
      result = val;
    });
    service.step.subscribe(val => step = val);
    service.fillBones(15);
    service.startGame(3);
    service.moveBone(result[emptyIndex - 1]);
    expect(step === 0).toBe(false);
  });

  it('#checkGameStatus should set isFinished to true', () => {
    let result;
    service.isFinished.subscribe(val => result = val);
    service.fillBones(15);
    service.checkGameStatus();
    expect(result).toBe(true);
  });

});
