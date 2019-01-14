export class Pitch {
    private _value!: number;

    constructor(pitch: number = 4) {
        this.value = pitch;
    }

    public inc() {
        this.value++;
    }

    public dec() {
        this.value--;
    }

    // getters & setters
    get value(): number {
        return this._value;
    }

    set value(value: number) {
        if (value > -1) {
            this._value = value;
        } else {
            throw new Error(`Trying to set a negative pitch : ${value}`);
        }
    }
}