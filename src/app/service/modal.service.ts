import { Injectable } from '@angular/core';

//Creating an id System For Modals
interface IModel {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }
  private modals: IModel[] = []


  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
  }

  isModalVisible(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible
  }

  toggleModal(id: string): void {
    const modal = this.modals.find(element => element.id === id)

    //check if the returned value is IModel or undefiened
    if (modal) {
      modal.visible = !modal.visible;
    }
  }


}
