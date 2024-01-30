import { LogEntryType } from './../../models/log-entry-type';
import { LogEntry } from './../../models/log-entry';
import { Category } from './../../models/category';
import { Chart } from 'chart.js/auto';

import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogEntryService } from '../../services/logentry.service';
import { Unit } from '../../models/unit';
import { CategoryService } from '../../services/category.service';
import { UnitService } from '../../services/unit.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { LogEntryTypeService } from '../../services/logentrytype.service';
import { LogEntryTypeComponent } from "../log-entry-type/log-entry-type.component";
import { NgChartsModule } from 'ng2-charts';


@Component({
    selector: 'app-daily-log',
    standalone: true,
    templateUrl: './daily-log.component.html',
    styleUrl: './daily-log.component.css',
    imports: [CommonModule, FormsModule, NgbTypeaheadModule, LogEntryTypeComponent, NgChartsModule]
})

export class DailyLogComponent implements OnInit{

  title = 'ngLogEntry';
  logEntrys: LogEntry[] = [];
  selected: LogEntry | null = null;
  newLogEntry:LogEntry = new LogEntry();
  newType:LogEntryType|null = null;
  editLogEntry: LogEntry | null = null;
  showCompleted = false;
  units: Unit[]=[];
  newUnit:Unit = new Unit();
  categories: Category[]=[];
  category: Category=new Category();
  logEntryTypes: LogEntryType[]=[];
  logEntryType: LogEntryType = new LogEntryType();
  datePipe: DatePipe = new DatePipe("en-US");
  public chart: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private LogEntryServ: LogEntryService, private logEntryTypeServ: LogEntryTypeService,
    private categoryServ: CategoryService, private unitServ: UnitService){}

  ngOnInit(): void {
    this.loadLogEntrys();
    this.loadLogEntryTypes();
    this.loadCategories();
    this.loadUnits();
    this.createChart();
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          let LogEntryIdStr = params.get("logId");
          if (LogEntryIdStr) {
            let LogEntryId = parseInt(LogEntryIdStr);
            if (!isNaN(LogEntryId)) {
              console.log(LogEntryId);
              this.LogEntryServ.show(LogEntryId).subscribe(
                {
                  next: (LogEntry: LogEntry | null) => {
                    this.selected = LogEntry;
                  },
                  error: (error: any) => {
                    console.error('Error in LogEntrylist.component: id correct but no LogEntry found')
                    this.router.navigateByUrl('notFound');
                  }
                }
              )
            } else {
              this.router.navigateByUrl("invalidLogEntryId");
            }
          }
        }
      }
    )
  }

	search: OperatorFunction<string, readonly LogEntryType[]> = (text$: Observable<string>) =>

      text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : this.logEntryTypes.filter((entryType) => entryType.name.toLowerCase().indexOf(entryType.name.toLowerCase()) > -1).slice(0, 10),
			),
		);
    formatter = (result: LogEntryType) => result.name;
    formatterInput = (result: LogEntryType) => result.name;

  displayLogEntry(LogEntry: LogEntry): void {
    this.selected = LogEntry;
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
	        datasets: [
          { label: "Sleep Quality", data: []},
          { label: "Pain Level", data: []},
          { label: "Exercise Intensity", data: []},
          { label: "Food Health Quality", data: []},
        ]
      },
      options: { aspectRatio:4.5}
    });
    this.updateChart();
  }

  updateChart(): void {

    let sleepData = this.logEntrys
      .filter(entry => entry.logEntryType.name.toLowerCase() === "sleep")
      .map(entry => entry.degree);

    let painData = this.logEntrys
      .filter(entry => entry.logEntryType.name.toLowerCase() === "pain")
      .map(entry => entry.degree);

    let activityData = this.logEntrys
      .filter(entry => entry.logEntryType.name.toLowerCase() === "workout")
      .map(entry => entry.degree);

    let foodData = this.logEntrys
      .filter(entry => entry.logEntryType.category && entry.logEntryType.category.name.toLowerCase() === "food")
      .map(entry => entry.degree);

      console.log(this.logEntrys); // Log all entries to see their structure
      console.log(foodData);

    let labels = this.logEntrys.map((entry) => entry.entryDate);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = sleepData;
    this.chart.data.datasets[1].data = painData;
    this.chart.data.datasets[2].data = activityData;
    this.chart.data.datasets[3].data = foodData;

    this.chart.update();
  }

  resetNewEntry() {
    this.newLogEntry = new LogEntry();
  }

  displayTable(): void {
    this.selected = null;
  }

  setEditLogEntry(): void {
    this.editLogEntry = Object.assign({}, this.selected);
  }

  cancelEdit() {
    this.editLogEntry = null;
  }

  loadLogEntrys() {
    this.LogEntryServ.index().subscribe(
      {
        next: (logEntryList: LogEntry[]) => {
          this.logEntrys = logEntryList;
        },
        error: (problem: any) => {
          console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
        }
      }
      );
    }

  newLogEntryType(){
    this.newType=new LogEntryType();
  }

  loadLogEntryTypes() {
    this.logEntryTypeServ.index().subscribe(
      {
        next: (logEntryTypeList: LogEntryType[]) => {
          this.logEntryTypes = logEntryTypeList;
          console.log(logEntryTypeList)
        },
        error: (problem: any) => {
          console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
        }
      }
      );
    }

  loadCategories() {
    this.categoryServ.index().subscribe(
      {
        next: (categories: Category[]) => {
          this.categories = categories;
        },
        error: (problem: any) => {
          console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
        }
      }
      );
    }

  loadUnits() {
    this.unitServ.index().subscribe(
      {
        next: (units: Unit[]) => {
          this.units = units;
        },
        error: (problem: any) => {
          console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
        }
      }
      );
    }



  addLogEntry(newLogEntry: LogEntry) {
    if (newLogEntry) {

      // newLogEntry.unit = this.newUnit;
      console.log(this.units);
      console.log(newLogEntry);
      console.log(newLogEntry.description);
      // for (const key in newLogEntry) {
      //     console.log("[" + key + "]: " + newLogEntry[key]);
      // }

      this.LogEntryServ.create(newLogEntry).subscribe(
        {
          next: (createdLogEntry: LogEntry) => {
            this.logEntrys.push(createdLogEntry);
            this.loadLogEntrys();
            this.newUnit=new Unit();
            this.category=new Category();
            this.logEntryType =new LogEntryType();
          },
          error: (error: any) => {
            console.error('LogEntryListHttpComponent.addLogEntrys(): error creating LogEntry', error);
          }
        }
        );
      }
  }

  updateLogEntry(LogEntry: LogEntry) {

    this.LogEntryServ.update(LogEntry).subscribe(
      {
        next: (updatedLogEntry: any) => {
          if (this.selected) {
            this.selected = Object.assign({}, updatedLogEntry);
          }
          this.editLogEntry = null;
          this.loadLogEntrys();
          window.location.reload();
        },
        error: (error: any) => {
          console.error('LogEntryListHttpComponent.updateLogEntry(): error updating LogEntry', error);
        }
      }
    );
  }

  deleteLogEntry(tid: number) {
    this.LogEntryServ.destroy(tid).subscribe(
      {
        next: () => {
          this.logEntrys = this.logEntrys.filter(LogEntry => LogEntry.id !== tid);
          if (this.selected && this.selected.id === tid) {
            this.selected = null;
          }
        },
        error: (error: any) => {
          console.error('LogEntryListHttpComponent.deleteLogEntry(): error removing LogEntry', error);
        }
      }
    );
  }
}
