import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder = '';
  @Input() type = "text";
  @Input() format = '';

  constructor() { }

  ngOnInit(): void {
  }

}
