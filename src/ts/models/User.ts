/** interface representing a Comuna. */
export interface IUser {
    id: string;
    name: string;
}

/** Class representing a Comuna. */
export class User implements IUser {

    // -----------------------------------------------------------------------------------------------------
    // @ Private properties
    // -----------------------------------------------------------------------------------------------------
    private _id: string;
    private _name: string;

    /**
     * Creates an instance of Comuna.
     * @param {string} id
     * @param {string} name
     */
    constructor(id?: string,
                name?: string) {
        this._id = id || '';
        this._name = name || '';
    }

    /**
     * Gets id
     * @returns id
     */
    get id(): string {
        return this._id;
    }

    /**
     * Sets id
     * @param {string} id
     */
    set id(id: string) {
        this._id = id;
    }
 
    /**
     * Gets name
     * @returns name
     */
    get name(): string {
        return this._name;
    }
 
    /**
     * Sets name
     * @param {string} name
     */
    set name(name: string) {
        this._name = name;
    }
}