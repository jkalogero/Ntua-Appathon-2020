import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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

  conditions = {}
  conditionForModal = ""
  lengthOfConditionsModalReduced: Number
  loading = true

  statistics: any


  // the following are the configuration for statistics diagram
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  // [{"_id": "Placebo", "count": 17855}, {"_id": "placebo", "count": 2856}, {"_id": "Cyclophosphamide", "count": 1353}, {"_id": "Dexamethasone", "count": 1191}, {"_id": "Paclitaxel", "count": 1070}, {"_id": "Carboplatin", "count": 1064}, {"_id": "Cisplatin", "count": 1061}, {"_id": "cyclophosphamide", "count": 943}, {"_id": "Gemcitabine", "count": 892}, {"_id": "Metformin", "count": 865}]
  // public barChartLabels: Label[] = ["Placebo", "placebo", "Cyclophosphamide", "Dexamethasone", "Paclitaxel", "Carboplatin", "Cisplatin", "cyclophosphamide", "Gemcitabine", "Metformin"];
  public barChartLabels: Label[] = []
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: []}
  ]
  barChartColors = [
    {backgroundColor: ['#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC', '#A4DEDC']}
  ];

  noSort(){}

  OptionSelected(option) {
    console.log(option);   
    this.selectedoption = option
    if (option == "Statistics")
    this.getStatistics()
  }

  getTopDrugs(){
    let recordsObservable = this._service.getTopDrugs({"condition": this.params['condition']})
    recordsObservable.subscribe(recordsResult => {
      this.records = recordsResult
      console.log(JSON.stringify(this.records))
    })

    this.showingResults = true
    this.conditionShowing = this.params['condition'] 
  }

  getConditions(drug){
    let conditionsObservable = this._service.getConditions(drug)
    conditionsObservable.subscribe(conditionsResult => {
      this.loading = true
      this.conditions = conditionsResult
      this.lengthOfConditionsModalReduced = (Object.keys(this.conditions).length) - 10
      this.loading = false
      console.log(JSON.stringify(this.conditions));
      

    })
    this.conditionForModal = drug
    this.showingResults = true
    this.conditionShowing = this.params['condition'] 
  }

  getStatistics(){
    let statisticsObservable = this._service.getStatistics()
    statisticsObservable.subscribe(statisticsResult => {
      this.statistics = statisticsResult
      console.log(JSON.stringify(this.statistics))
      this.statistics['results'].forEach(element => {
        if(element["_id"] == "placebo"){
          this.barChartData[0]["data"][0] += element["count"]  
        }
        else{
          this.barChartLabels.push(element["_id"])
          this.barChartData[0]["data"].push(element["count"])
        }
      });
      // console.log(JSON.stringify(this.statistics))
    })
    this.barChartData[0]["label"] = 'Times it has been used'
  }

  computeRemainingLength(){
    return this.lengthOfConditionsModalReduced = (Object.keys(this.conditions).length) - 10
  }

  constructor(private _service: RecordsService) {
    
  
   }

  ngOnInit(): void {
  }

}
