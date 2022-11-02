import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AlertComponent } from './alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { BlockEvendDirective } from './directives/block-evend.directive';



const modules = [
  MatButtonModule
]

@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    BlockEvendDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ...modules
  ],
  exports: [
    ModalComponent,
    TabComponent,
    TabsContainerComponent,
    AlertComponent,
    InputComponent,
    BlockEvendDirective,
    ...modules
  ]
})
export class SharedModule { }
