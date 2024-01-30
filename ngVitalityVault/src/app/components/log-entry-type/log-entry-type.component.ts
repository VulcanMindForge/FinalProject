import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LogEntryType } from '../../models/log-entry-type';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { LogEntryTypeService } from '../../services/logentrytype.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-log-entry-type',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './log-entry-type.component.html',
  styleUrl: './log-entry-type.component.css'
})
export class LogEntryTypeComponent {
  selected: LogEntryType | null = null;
  newEntryType: LogEntryType |null = new LogEntryType();
  editLogEntryType: LogEntryType | null = null;
  categories: Category[] = [];
  category: Category = new Category();
  logEntryTypes: LogEntryType[]=[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private logEntryTypeServ: LogEntryTypeService, private categoryServ: CategoryService){}

  ngOnInit(): void {
    this.loadLogEntryTypes();
    this.loadCategories();

    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          let LogEntryTypeIdStr = params.get("LogEntryId");
          if (LogEntryTypeIdStr) {
            let LogEntryTypeId = parseInt(LogEntryTypeIdStr);
            if (!isNaN(LogEntryTypeId)) {
              this.logEntryTypeServ.show(LogEntryTypeId).subscribe(
                {
                  next: (LogEntry: LogEntryType | null) => {
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

  displayLogEntryType(LogEntry: LogEntryType): void {
    this.selected = LogEntry;
  }

  setEditLogEntryType(): void {
    this.editLogEntryType = Object.assign({}, this.selected);
  }

  cancelEdit() {
    this.editLogEntryType = null;
  }

  loadLogEntryTypes() {
    this.logEntryTypeServ.index().subscribe(
      {
        next: (logEntryTypeList: LogEntryType[]) => {
          this.logEntryTypes = logEntryTypeList;
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

  addLogEntryType() {
    if(this.newEntryType){
      this.newEntryType.category = this.category;
      this.logEntryTypeServ.create(this.newEntryType).subscribe(
        {
          next: (createdEntryType: LogEntryType) => {
            this.logEntryTypes.push(createdEntryType);
            this.newEntryType = new LogEntryType();
            this.loadLogEntryTypes();
            window.location.reload();
            this.category=new Category();
          },
          error: (error: any) => {
            console.error('LogEntryListHttpComponent.addLogEntrys(): error creating LogEntry', error);
          }
        }
        );
      }
  }

  updateLogEntry(entryType: LogEntryType) {

    this.logEntryTypeServ.update(entryType).subscribe(
      {
        next: (updatedEntryType: any) => {
          if (this.selected) {
            this.selected = Object.assign({}, this.editLogEntryType);
          }
          this.editLogEntryType = null;
          this.loadLogEntryTypes();
        },
        error: (error: any) => {
          console.error('LogEntryListHttpComponent.updateLogEntry(): error updating LogEntry', error);
        }
      }
    );
  }

  deleteLogEntry(tid: number) {
    this.logEntryTypeServ.destroy(tid).subscribe(
      {
        next: () => {
          this.logEntryTypes = this.logEntryTypes.filter(entryType => entryType.id !== tid);
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
