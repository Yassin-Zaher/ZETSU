import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList()
  constructor() { }


  ngAfterContentInit(): void {

    const activeTabs = this.tabs.filter(
      tab => tab.isActive
    )

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs.first)
    }
  }


  selectTab(tab: TabComponent): boolean {
    this.tabs.forEach(tab => {
      tab.isActive = false
    })

    tab.isActive = true
    /* return false for preventing the default behavior 
    alternatively you can use the event.preventDefault
    */
    return false
  }



}
