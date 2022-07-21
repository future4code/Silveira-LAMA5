export class Band {

    constructor(
 
       private id: string,
       private name: string,
       private music_genre: string,
       private responsible: string
 
    ) { }
 
    getId() {
       return this.id;
    }
 
    getName() {
       return this.name
    }
 
    getMusic_genre() {
       return this.music_genre
    }
 
    getResponsible() {
       return this.responsible
    }
 
 
    setId(id: string) {
       return this.id = id
    }
 
    setName(name: string) {
       return this.name = name
    }
 
    setMusic_genre(music_genre: string) {
       return this.music_genre = music_genre
    }
 
    setResponsible(responsible: string) {
       return this.responsible = responsible
    }
 }
 
 
 export interface findBandInputDTO {
    name: string
 }
 
 export interface BandinputDTO {
    name: string
    music_genre: string
    responsible: string
 }
 
 export interface UserAdmDTO {
 
    email: string
 }