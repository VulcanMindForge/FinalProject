
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogEntryService } from '../../services/logentry.service';
import { LogEntry } from '../../models/log-entry';


@Component({
  selector: 'app-daily-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-log.component.html',
  styleUrl: './daily-log.component.css'
})

export class LogEntryListComponent implements OnInit{
  title = 'ngLogEntry';
  LogEntrys: LogEntry[] = [];
  selected: LogEntry | null = null;
  newLogEntry = new LogEntry();
  editLogEntry: LogEntry | null = null;
  showCompleted = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private LogEntryServ: LogEntryService){}

  ngOnInit(): void {
    this.loadLogEntrys();
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
        next: (LogEntrys: LogEntry[]) => {
          this.LogEntrys = LogEntrys;
        },
        error: (problem: any) => {
          console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
        }
      }
      );
    }

  addLogEntry(logEntry: LogEntry) {
    this.LogEntryServ.create(this.newLogEntry).subscribe(
      {
        next: (createdLogEntry: LogEntry) => {
          this.LogEntrys.push(createdLogEntry);
          this.newLogEntry = new LogEntry();
          this.loadLogEntrys();
        },
        error: (error: any) => {
          console.error('LogEntryListHttpComponent.addLogEntrys(): error creating LogEntry', error);
        }
      }
    );
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
