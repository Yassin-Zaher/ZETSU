import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public videoOrder = '1';

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);

    this.router.navigate(["manage", value], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
  }

}
