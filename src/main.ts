import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  window.ipcRenderer.on('url',(event: Event, data: string)=>{
    console.log("on url 2");
    console.log(data, event);
  });