import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/service/clip.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public videoOrder = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null

  constructor(private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modal: ModalService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] == '2' ? params['sort'] : '1'
    })

    this.clipService.getUserClips().subscribe((docs) => {
      this.clips = []
      docs.forEach((doc) => {
        this.clips.push({
          docId: doc.id,
          ...doc.data()
        })
      })
    });



  }


  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);
    console.log("heeeeey" + value);


    this.router.navigate(["manage"], {
      relativeTo: this.route.root,
      queryParams: {
        sort: value
      }
    })
  }


  openModal($event: Event, clip: IClip) {
    $event.preventDefault()

    this.activeClip = clip

    this.modal.toggleModal("editClip")
  }


  update($event: IClip) {
    this.clips.forEach((elt, index) => {
      if (elt.docId === $event.docId) {
        this.clips[index].title = $event.title
      }
    })
  }


  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault()
    this.clipService.deleteClip(clip)

    this.clips.forEach((element, index) => {
      if (element.docId == clip.docId) {
        this.clips.splice(index, 1)
      }
    })
  }

}
