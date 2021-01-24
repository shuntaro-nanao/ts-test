type Suji = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Dan = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Player = 'first' | 'second'

class Game {
  private pieces = Game.makePieces()
  private static makePieces() {
    return [
      new Osho('first', 5, '1'),
      new Osho('second', 5, '9')
    ]
  }
}

class Position {
  constructor(
    private suji: Suji,
    private dan: Dan
  ) {}

  distanceFrom(position: Position, player: Player) {
    if (player === 'first') {
      return {
        suji: Math.abs(position.suji - this.suji),
        dan: Math.abs(Number(position.dan) - Number(this.dan))
      }
    } else {
      return {
        suji: Math.abs(position.suji - this.suji),
        dan: -(Math.abs(Number(position.dan) - Number(this.dan)))
      }
    }
  }
}

abstract class Piece {

  protected posotion: Position

  constructor(
    private readonly player: Player,
    suji: Suji,
    dan: Dan
  ) {
    this.posotion = new Position(suji, dan)
  }

  moveTo(position: Position) {
    this.posotion = position
  }

  abstract canMoveTo(posotion: Position, player: Player): boolean
}

class Osho extends Piece {
  canMoveTo(posotion: Position, player: Player): boolean {
    const distance = this.posotion.distanceFrom(posotion, player)
    return distance.suji < 2 && distance.dan < 2
  }
}