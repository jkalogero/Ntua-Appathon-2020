import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  records = {}
  selectedoption = 'TopDrugs'

  params = {
    "condition": ""
  }

  showingResults = false
  conditionShowing = ""

  noSort(){}

  OptionSelected(option) {
    console.log(option);   
    this.selectedoption = option
  }

  getTopDrugs(){
    let recordsObservable = this._records.getTopDrugs({"condition": this.params['condition']})
    recordsObservable.subscribe(recordsResult => {
      this.records = recordsResult
      console.log(JSON.stringify(this.records))
    })

    this.showingResults = true
    this.conditionShowing = this.params['condition']
    // console.log(JSON.stringify)
    
  }

  constructor(private _records: RecordsService) {
    
  
   }

  ngOnInit(): void {
  }

}
