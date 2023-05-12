import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, RefresherCustomEvent } from '@ionic/angular';
import { APIService } from '../services/api.service';

// import { HttpClientModule } from '@angular/common/http';
// import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  // imports: [IonicModule, NgFor, HttpClientModule], // --> moved to home.module.ts to circumvent standalone
  providers: [APIService]
})

export class HomePage implements OnInit
{
  // pregen
  constructor(
    private APIService: APIService
  ) {}

  menu: any[] = [];

  ngOnInit(): void
  {
    this.expandMenu();
  }

  private expandMenuRecursive(n: number = 10, top: boolean = false, retries: number = -1, delay: number = 1000): Promise<boolean>
  {
    // expands the menu by n, wrapped by a promise
    return new Promise(async (resolve) => {
      while (this.expandMenu(n, top) != true)
      {
        let attempt: number = 0;
        await new Promise(r => setTimeout(r, delay));

        if (retries == 0 || (retries > 0 && attempt > retries))
        {
          resolve(false);
          break;
        }

        attempt++;
      }

      resolve(true);
    });
  }

  private expandMenu(amount: number = 10, top: boolean = false): boolean
  {
    // expands the menu by n
    try
    {
      this.APIService.GetRandomPost(amount).subscribe(
        (data) => {
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


      return true;
    }
    catch(error)
    {
      console.warn(error);
      return false;
    }
  }

  menuRefreshed(event: Event): void
  {
    // called upon scrolling up from the menu to expand it
    let promise = this.expandMenuRecursive(10, true);
    promise.then(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    })
  }

  reachedMenuEnd(event: Event): void
  {
    // called upon scrolling to the end of the menu to expand it
    let promise = this.expandMenuRecursive();
    promise.then(() => {
      (event as RefresherCustomEvent).target.complete();
    })
  }
}
