import { Component } from '@angular/core';
import { Url, URLs, TabInstance } from './Interfaces/tab'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'surf-GPT';
  mytab: TabInstance = new TabInstance({url:'https://www.google.com'});
  
  onInit(){
    new TabInstance({url:'https://www.google.com'})

    window.ipcRenderer.on('url',(event: Event, data: string)=>{
      console.log("on url");
      console.log(data, event);
    });
  }

  onChangeUrl(url_input_element: HTMLInputElement){
    let url = url_input_element.value;
    if(!URLs.isValidHttpUrl(url)){
      if(!URLs.isValidWWWUrl(url)){
        let tokens = url.split(' ');
        url = 'https://www.google.com/search?q='
        for(let token of tokens){
          url = url + '+'+ token;
        }
      }else{
        url = 'http://' + url;
      }
    }
    url_input_element.value = url;
    window.ipcRenderer.invoke('urlChange',url);
    console.log(url);
  }


}
