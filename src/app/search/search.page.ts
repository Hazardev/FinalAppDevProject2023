import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { SearchbarCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [APIService]
})
export class SearchPage implements OnInit {

  constructor(
    private APIService: APIService
  ) { }

  menu: any[] = [];

  ngOnInit()
  {

  }

  private clearMenu(): void
  {
    this.menu = [];
  }

  private search(query: string = '', top: boolean = false): void
  {
    this.menu = [];
    this.APIService.GetSearchedPost(query, 10).subscribe(
      (data: any) => {
        data.recipes.forEach((recipe: any) => {
          if (top)
          {
            this.menu.unshift(recipe);
          }
          else
          {
            this.menu.push(recipe);
          }
        });
      }
    );
  }

  searchInput(event: Event): void
  {
    const query = (event as SearchbarCustomEvent)?.target?.value?.toLowerCase();
    this.search(query);
  }
}
