export interface IPerson {
    name:string;
    email:string;
    title:string;
    color:string;
    image?:string;
}
export const people: IPerson[] = [
    {
        "name": "Hanna Davyskiba",
        "image": "./hannadavyskiba.jpg",
        "email": "1@test.com",
        "title": "Official title",
        "color": "84b22f"
    },{
        "name": "Person 2",
        "image": "./hannadavyskiba.jpg",
        "email": "2@test.com",
        "title": "Official title",
        "color": "674b1b"
    },{
        "name": "Person 3",
        "image": "./hannadavyskiba.jpg",
        "email": "3@test.com",
        "title": "",
        "color": "a2a5dc"
    },{
        "name": "Person 4",
        "image": "./hannadavyskiba.jpg",
        "email": "4@test.com",
        "title": "Official title",
        "color": "9e3997"
    }
]