import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-widget',
  templateUrl: './info-widget.component.html',
  styleUrls: ['./info-widget.component.scss']
})
export class InfoWidgetComponent implements OnInit {
  @Input() caption: string;
  @Input() content: string;

  constructor() { }

  ngOnInit(): void {
  }

}
