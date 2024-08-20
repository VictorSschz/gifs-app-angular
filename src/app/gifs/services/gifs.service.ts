import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  constructor() { }

  private apiKey:string = '2Sgxre9yaKIgywSB2aGQWuoQKeKcraAx';
  private _tagsHistory:string[]=[];

  get tagHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){

    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
     this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
    }

       this._tagsHistory.unshift(tag);
       this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  async searchTag (tag:string):Promise<void>{

    if(tag.length === 0 ) {
      return Promise.resolve();
    }

    this.organizeHistory(tag);

    try {
      const url = 'http://api.giphy.com/v1/gifs/search?api_key=2Sgxre9yaKIgywSB2aGQWuoQKeKcraAx&q=valorant&limit=10'
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      console.log(resultado);
    } catch (error) {

    }



  }

}
