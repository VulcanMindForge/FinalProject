import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Trial } from '../../models/trial';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { TrialService } from '../../services/trial.service';
import { LogEntry } from '../../models/log-entry-type';
import { LogEntryService } from '../../services/logentry.service';
import { TrialComment } from '../../models/trial-comment.model';
import { AuthService } from '../../services/auth.service';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { TrialCommentService } from '../../services/trial-comment.service';

@Component({
  selector: 'app-trial-comments',
  standalone: true,
  imports: [FormsModule, CommonModule, NgChartsModule],
  templateUrl: './trial-comments.component.html',
  styleUrl: './trial-comments.component.css',
})
export class TrialCommentsComponent implements OnInit, AfterViewInit {
  newComment = new TrialComment();
  commentList: TrialComment[] = [];
  publishedTrials: Trial[] = [];
  chart: any;
  logEntries: LogEntry[] = [];
  expandedTrialId: number | null = null;
  selectedTrial = new Trial();

  @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;

  constructor(
    private trialServ: TrialService,
    private logEntryServ: LogEntryService,
    private trialComServ: TrialCommentService
  ) {}

  ngOnInit(): void {
    this.loadTrials();
  }

  ngAfterViewInit(): void {
    // After the view is initialized, check if there is a selectedTrial and create the chart
    if (this.selectedTrial && this.chartCanvas) {
      this.createChart(this.selectedTrial.id);
      this.loadTrials();
    }
  }

  loadTrials() {
    this.trialServ.indexByPublished().subscribe({
      next: (trialList: Trial[]) => {
        console.log(trialList);
        this.publishedTrials = trialList;
      },
      error: (problem: any) => {
        console.error(
          'LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys',
          problem
        );
      },
    });
  }

  loadEntries() {
    this.logEntryServ.indexByTrial(this.selectedTrial.id).subscribe({
      next: (logEntryList: LogEntry[]) => {
        this.logEntries = logEntryList;
        this.destroyChart();
        setTimeout(() => {
          this.createChart(this.selectedTrial.id);
          this.updateChart(this.selectedTrial);
        }, 50);
      },
      error: (problem: any) => {
        console.error(
          'LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys',
          problem
        );
      },
    });
  }

  toggleExpansion(trialId: number): void {
    let newSelectedTrial = this.publishedTrials.find(
      (trial) => trial.id === trialId
    );

    if (newSelectedTrial) {
      this.expandedTrialId = trialId;

      if (this.selectedTrial && this.selectedTrial.id === trialId) {
        // If the same trial is clicked, collapse it
        this.expandedTrialId = null;
        this.selectedTrial = new Trial();
      } else {
        // If a different trial is clicked, update the chart
        this.selectedTrial = newSelectedTrial;
        this.expandedTrialId = trialId;
        this.loadEntries();

        this.orderComments(newSelectedTrial.trialComments);
      }
    }
  }

  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  createChart(trialId: number): void {
    if (this.chartCanvas) {
      const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;


      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            { label: 'Sleep Quality', data: [] },
            { label: 'Pain Level', data: [] },
            { label: 'Exercise Intensity', data: [] },
            { label: 'Food Health Quality', data: [], borderColor: '#BEDDED', backgroundColor: '#bedded' },
          ],
        },
        options: {
          aspectRatio: 4.5,
          scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                min: this.selectedTrial.startDate.toString(),
                max: this.selectedTrial.endDate.toString()
            },
            y: {
                min: 0,
                max: 10
            }
        }
        },
      });
    } else {
      setTimeout(() => this.createChart(trialId), 50);
    }
  }

  updateChart(selectedTrial: Trial | undefined): void {
    if (
      !selectedTrial ||
      !selectedTrial.startDate ||
      !selectedTrial.endDate ||
      selectedTrial === undefined
    ) {
      console.error('Invalid selectedTrial:', selectedTrial);
      return;
    }

    let groupedData = new Map<
      string,
      { sleep: number[]; pain: number[]; activity: number[]; food: number[] }
    >();

    // Filter log entries based on the selected trial's start and end dates
    let filteredLogEntries = this.logEntries.filter((entry) => {
      return (
        entry.entryDate >= selectedTrial.startDate &&
        entry.entryDate <= selectedTrial.endDate
      );
    });

    console.log(filteredLogEntries);

    filteredLogEntries.forEach((entry) => {
      if (entry.entryDate) {
        let key = entry.entryDate.toString();
        if (!groupedData.has(key)) {
          groupedData.set(key, { sleep: [], pain: [], activity: [], food: [] });
        }

        let entryTypeData = groupedData.get(key);
        if (entryTypeData) {
          switch (entry.logEntryType.category?.name.toLowerCase()) {
            case 'sleep':
              entryTypeData.sleep.push(parseFloat(entry.degree));
              break;
            case 'pain':
              entryTypeData.pain.push(parseFloat(entry.degree));
              break;
            case 'workout':
              entryTypeData.activity.push(parseFloat(entry.degree));
              break;
            case 'food':
              entryTypeData.food.push(parseFloat(entry.degree));
              break;
          }
        }
      }
    });

    // Sort labels based on entryDate
    let sortedLabels = Array.from(groupedData.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let sleepData = sortedLabels.map((date) =>
      this.average(groupedData.get(date)?.sleep || [])
    );
    let painData = sortedLabels.map((date) =>
      this.average(groupedData.get(date)?.pain || [])
    );
    let activityData = sortedLabels.map((date) =>
      this.average(groupedData.get(date)?.activity || [])
    );
    let foodData = sortedLabels.map((date) =>
      this.average(groupedData.get(date)?.food || [])
    );

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

  addComment() {
    this.trialComServ.create(this.newComment, this.selectedTrial.id).subscribe({
      next: (comment) => {
        this.selectedTrial.trialComments.push(comment);
        this.newComment = new TrialComment();
      },
      error: () => {
        console.error('issue with adding comment in trial comment component');
      },
    });
  }

  orderComments(trialComments: TrialComment[]) {
    this.commentList = trialComments;
    this.commentList.sort((a, b) => a.contentDate.localeCompare(b.contentDate));
  }


}
