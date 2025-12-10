import { Component } from '@angular/core';
@Component({selector:'app-news', templateUrl:'./news.component.html'})
export class NewsComponent {
  articles = [
    {title: 'Новина 1', text: 'Опис новини 1'},
    {title: 'Новина 2', text: 'Опис новини 2'}
  ];
}
