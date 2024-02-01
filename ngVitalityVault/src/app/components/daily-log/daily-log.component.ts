import { LogEntryType } from './../../models/log-entry-type';
import { LogEntry } from './../../models/log-entry';
import { Category } from './../../models/category';
import { Chart } from 'chart.js/auto';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LogEntryService } from '../../services/logentry.service';
import { Unit } from '../../models/unit';
import { CategoryService } from '../../services/category.service';
import { UnitService } from '../../services/unit.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { LogEntryTypeService } from '../../services/logentrytype.service';
import { LogEntryTypeComponent } from "../log-entry-type/log-entry-type.component";
import { NgChartsModule } from 'ng2-charts';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import dayjs from 'dayjs';

@Component({
  selector: 'app-daily-log',
  standalone: true,
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.css'],
  imports: [CommonModule, FormsModule, NgbTypeaheadModule, LogEntryTypeComponent, NgChartsModule, RouterModule]
})

export class DailyLogComponent implements OnInit {

  title = 'ngLogEntry';
  logEntrys: LogEntry[] = [];
  selected: LogEntry | null = null;
  newLogEntry: LogEntry = new LogEntry();
  newType: LogEntryType | null = null;
  editLogEntry: LogEntry | null = null;
  showCompleted = false;
  units: Unit[] = [];
  newUnit: Unit = new Unit();
  categories: Category[] = [];
  category: Category = new Category();
  logEntryTypes: LogEntryType[] = [];
  logEntryTypesFiltered: LogEntryType[] = [];
  logEntryType: LogEntryType = new LogEntryType();
  datePipe: DatePipe = new DatePipe("en-US");
  chart: any;
  degree: string = "Quality";
  logEntriesByDay: LogEntry[] = [];
  today = new Date().toISOString().split('T')[0];
  isCreated = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private LogEntryServ: LogEntryService,
    private logEntryTypeServ: LogEntryTypeService,
    private categoryServ: CategoryService,
    private unitServ: UnitService,
  ) {}

  ngOnInit(): void {
    this.loadLogEntrys();
    this.loadLogEntryTypes();
    this.loadCategories();
    this.loadUnits();
    this.createChart();
    this.loadEntriesByDay(this.today);

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let LogEntryIdStr = params.get("logId");
        if (LogEntryIdStr) {
          let LogEntryId = parseInt(LogEntryIdStr);
          if (!isNaN(LogEntryId)) {
            console.log(LogEntryId);
            this.LogEntryServ.show(LogEntryId).subscribe({
              next: (LogEntry: LogEntry | null) => {
                this.selected = LogEntry;
                if(LogEntry?.logEntryType.category){
                  this.category=LogEntry?.logEntryType.category;
                  this.setDegree(this.category.name);
                }
              },
              error: (error: any) => {
                console.error('Error in LogEntrylist.component: id correct but no LogEntry found');
                this.router.navigateByUrl('notFound');
              }
            });
          } else {
            this.router.navigateByUrl("invalidLogEntryId");
          }
        }
      }
    });
  }

  confirmCreation() {
    this.isCreated = false;
  }

  loadEntriesByDay(date: string){
    this.LogEntryServ.indexByDate(date).subscribe({
      next: (entries) => {
        this.logEntriesByDay = entries;
      },
      error: (oops) => {
        console.error(
          'ProfileComponent.logentries error: error getting log entries'
        );
        console.error(oops);
      },
    });
  }


  search: OperatorFunction<string, readonly LogEntryType[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1 ? [] : this.logEntryTypes.filter((entryType) => entryType.name.toLowerCase().indexOf(entryType.name.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  formatter = (result: LogEntryType) => result.name;
  formatterInput = (result: LogEntryType) => result.name;

  displayLogEntry(LogEntry: LogEntry): void {
    this.selected = LogEntry;
  }

  createChart() {
    let today = new Date();
    today.setHours(0,0,0,0)

    let endDate = new Date(today);
    let startDate = dayjs(endDate).subtract(30, 'day');

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          { label: "Sleep Quality", data: [] },
          { label: "Pain Level", data: [] },
          { label: "Exercise Intensity", data: [] },
          { label: "Food Health Quality", data: [] },
        ]
      },
      options: {
        aspectRatio: 4.5,
        onClick: (event: any, chartElements: any[]) => {
          this.handleChartClick(event, chartElements);
        },
        scales: {
          x: {
              type: 'time',
              time: {
                  unit: 'day'
              },
              min: startDate.toDate().getTime(),
              max: endDate.toDateString()
          },
          y: {
            min: 0,
            max:10
        }
      }
      }
    });
  }

  resetSelected() {
    this.selected = null;
    }

  handleChartClick(event: MouseEvent, chartElements: any[]): void {
    if (chartElements && chartElements.length > 0) {
      const index = chartElements[0].index;
      const logEntry = this.logEntrys[index];
      if (logEntry) {
        this.router.navigate(['/dailyLog', logEntry.id]);
      }
    }
  }

  updateChart(): void {
    let groupedData = new Map<string, { sleep: number[], pain: number[], activity: number[], food: number[] }>();

    this.logEntrys.forEach(entry => {
      if (entry.entryDate) {
        let key = entry.entryDate.toString();
        if (!groupedData.has(key)) {
          groupedData.set(key, { sleep: [], pain: [], activity: [], food: [] });
        }

        let entryTypeData = groupedData.get(key);
        if (entryTypeData) {
          switch (entry.logEntryType.category?.name.toLowerCase()) {
            case "sleep":
              entryTypeData.sleep.push(parseFloat(entry.degree));
              break;
            case "pain":
              entryTypeData.pain.push(parseFloat(entry.degree));
              break;
            case "workout":
              entryTypeData.activity.push(parseFloat(entry.degree));
              break;
            case "food":
              entryTypeData.food.push(parseFloat(entry.degree));
              break;
          }
        }
      }
    });

    // Sort labels based on logEntry.entryDate
    let sortedLabels = Array.from(groupedData.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let sleepData = sortedLabels.map(date => this.average(groupedData.get(date)?.sleep || []));
    let painData = sortedLabels.map(date => this.average(groupedData.get(date)?.pain || []));
    let activityData = sortedLabels.map(date => this.average(groupedData.get(date)?.activity || []));
    let foodData = sortedLabels.map(date => this.average(groupedData.get(date)?.food || []));

    // Filter out 0 or null values
    sleepData = sleepData.filter(value => value !== 0 && value !== null);
    painData = painData.filter(value => value !== 0 && value !== null);
    activityData = activityData.filter(value => value !== 0 && value !== null);
    foodData = foodData.filter(value => value !== 0 && value !== null);

    this.chart.data.labels = sortedLabels;
    this.chart.data.datasets[0].data = sleepData;
    this.chart.data.datasets[1].data = painData;
    this.chart.data.datasets[2].data = activityData;
    this.chart.data.datasets[3].data = foodData;

    this.chart.update();
  }


  average(arr: number[]): number {
    if (arr.length === 0) return 0;
    let sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
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
    this.LogEntryServ.index().subscribe({
      next: (logEntryList: LogEntry[]) => {
        this.logEntrys = logEntryList;
        this.updateChart();
      },
      error: (problem: any) => {
        console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
      }
    });
  }

  newLogEntryType() {
    this.newType = new LogEntryType();
  }

  loadLogEntryTypes() {
    this.logEntryTypeServ.index().subscribe({
      next: (logEntryTypeList: LogEntryType[]) => {
        this.logEntryTypes = logEntryTypeList;
        console.log(logEntryTypeList);
      },
      error: (problem: any) => {
        console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
      }
    });
  }

  loadCategories() {
    this.categoryServ.index().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (problem: any) => {
        console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
      }
    });
  }

  loadUnits() {
    this.unitServ.index().subscribe({
      next: (units: Unit[]) => {
        this.units = units;
      },
      error: (problem: any) => {
        console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
      }
    });
  }

  addLogEntry(newLogEntry: LogEntry) {
    if (newLogEntry) {
      this.LogEntryServ.create(newLogEntry).subscribe({
        next: (createdLogEntry: LogEntry) => {
          this.loadLogEntrys();
          this.isCreated = true;
          this.newLogEntry = new LogEntry();

          this.LogEntryServ.show(createdLogEntry.id).subscribe({
            next: (log: LogEntry) => {
              this.selected = log;
            },
            error: (error: any) => {
              console.error('Nested http request in create failed to retrieve new LogEntry', error);
            }
          });
        },
        error: (error: any) => {
          console.error('LogEntryListHttpComponent.addLogEntrys(): error creating LogEntry', error);
        }
      });
    }
  }

  updateLogEntry(LogEntry: LogEntry) {
    this.LogEntryServ.update(LogEntry).subscribe({
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
    });
  }

  deleteLogEntry(tid: number) {
    let isConfirmed = window.confirm('Are you sure you want to delete this log entry?');

    if (!isConfirmed) {
      return;
    }

    this.LogEntryServ.destroy(tid).subscribe({
      next: () => {
        this.logEntrys = this.logEntrys.filter(LogEntry => LogEntry.id !== tid);
        if (this.selected && this.selected.id === tid) {
          this.selected = null;
        }
      },
      error: (error: any) => {
        console.error('LogEntryListHttpComponent.deleteLogEntry(): error removing LogEntry', error);
      }
    });
  }

  setDegree(categoryName: string) {
    console.log(categoryName);
    if (categoryName === "Food") {
      this.degree = "Quality";
    } else if (categoryName === "Workout") {
      this.degree = "Intensity";
    } else if (categoryName === "Sleep") {
      this.degree = "Quality";
    } else if (categoryName === "Pain") {
      this.degree = "Pain Level";
    } else if (categoryName === "Medication") {
      this.degree = "Times/day";
    } else if (categoryName === "Supplement") {
      this.degree = "Times/day";
    }


  }

  selectCreate() {
    this.router.navigateByUrl('dailyLog');
  }
}
