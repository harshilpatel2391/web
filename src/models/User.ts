import axios, { AxiosResponse } from 'axios';
interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

type Callback = () => void;

export class User {
    private data: UserProps;
    events: {[key: string]: Callback[]} = {};

    constructor(data: UserProps) {
        this.data = data;
    }

    get(prop: string): (string | number) {
        return this.data[prop];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if(!handlers || handlers.length === 0) return;
        handlers.forEach(callback => {
            callback();
        });
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get("id")}`)
        .then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    save(): void {
        const id = this.get("id");
        if(id) {
            //put
            axios.put(`http://localhost/3000/users/${id}`, this.data);
        } else {
            //post
            axios.post("http://localhost:3000/users", this.data);
        }
    }
}