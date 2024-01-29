import { LogEntryType } from './../../models/log-entry-type';
import { LogEntry } from './../../models/log-entry';
import { Category } from './../../models/category';

import { CommonModule } from '@angular/common';
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


@Component({
  selector: 'app-daily-log',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule],
  templateUrl: './daily-log.component.html',
  styleUrl: './daily-log.component.css'
})

export class DailyLogComponent implements OnInit{
  title = 'ngLogEntry';
  LogEntrys: LogEntry[] = [];
  selected: LogEntry | null = null;
  newLogEntry:LogEntry|null = new LogEntry();
  newType:LogEntryType|null = null;
  editLogEntry: LogEntry | null = null;
  showCompleted = false;
  units: Unit[]=[];
  newUnit:Unit = new Unit();
  categories: Category[]=[];
  category: Category=new Category();
  logEntryTypes: LogEntryType[]=[];
  logEntryType: LogEntryType = new LogEntryType();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private LogEntryServ: LogEntryService, private logEntryTypeServ: LogEntryTypeService, private categoryServ: CategoryService, private unitServ: UnitService, ){}

  ngOnInit(): void {
    this.loadLogEntrys();
    this.loadLogEntryTypes();
    this.loadCategories();
    this.loadUnits();
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          let LogEntryIdStr = params.get("LogEntryId");
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
          this.LogEntrys = logEntryList;
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

  addLogEntry() {
    if(this.newLogEntry){
      this.newLogEntry.unit=this.newUnit;
      this.newLogEntry.logEntryType.category=this.category;
      console.log(this.newUnit)
      console.log(this.newLogEntry.logEntryType)
      console.log(this.logEntryType)
      this.LogEntryServ.create(this.newLogEntry).subscribe(
        {
          next: (createdLogEntry: LogEntry) => {
            this.LogEntrys.push(createdLogEntry);
            this.newLogEntry = new LogEntry();
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
            this.selected = Object.assign({}, this.editLogEntry);
          }
          this.editLogEntry = null;
          this.loadLogEntrys();
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
          this.LogEntrys = this.LogEntrys.filter(LogEntry => LogEntry.id !== tid);
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
