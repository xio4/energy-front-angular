import { Component, OnInit } from "@angular/core";
const styles = require('./app.component.css');

@Component({
    selector: "tyn-app",
    template: `<div classname=${styles.component}> </div>`
})
export class AppComponent implements OnInit {
    
    public constructor() {}
    
    public ngOnInit(): void {}
    
}
