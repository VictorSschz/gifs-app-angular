import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList : Gif[]=[];

  private apiKey:       string = '2Sgxre9yaKIgywSB2aGQWuoQKeKcraAx';
  private serviceUrl:   string = 'http://api.giphy.com/v1/gifs'
  private _tagsHistory: string[]=[];

  constructor( private http:HttpClient) {
      this.loadLocalStorage();
  }

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
       this.saveLocalStorage();

  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this.tagHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  private saveLocalStorage():void{

    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

   searchTag (tag:string):void{

    if(tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, {params})
        .subscribe(resp =>{

          this.gifList = resp.data;
          //console.log({gifs:this.gifList});
        })




  }

}
