export enum ACCIDENTAL {
    DOUBLE_FLAT = -2,
    FLAT = -1,
    NATURAL = 0,
    SHARP = 1,
    DOUBLE_SHARP = 2
}

export class Accidental {
    private _semitones!: ACCIDENTAL;

    constructor(semitones: number = 0) {
        this.semitones = semitones;
    }

    public addSharp() {
        switch(this.semitones) {
            case 2:
                throw new Error(`Cannot add sharp to a DOUBLE_SHARP.`)
            default:
                this.semitones++;
        }
    }

    public addFlat() {
        switch(this.semitones) {
            case -2:
                throw new Error(`Cannot add flat to a DOUBLE_FLAT.`)
            default:
                this.semitones--;
        }
    }

    // getters & setters
    // semitones
    get semitones(): number {
        return this._semitones;
    }

    set semitones(semitones: number) {
        if (ACCIDENTAL[semitones]) {
            this._semitones = semitones;
        } else {
            throw new Error(`Couldn't find a semitone with the value ${semitones}. Semitones available : ${ACCIDENTAL}`)
        }
    }

    // name
    get name(): string {
        return ACCIDENTAL[this._semitones];
    }
}