import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  records = {}

  constructor(private _records: RecordsService) {
    
    let recordsObservable = this._records.getData()
    recordsObservable.subscribe(recordsResult => {
      this.records = recordsResult
    })

   }

  ngOnInit(): void {
  }

}
