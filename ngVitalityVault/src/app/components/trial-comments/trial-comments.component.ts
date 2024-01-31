import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Trial } from '../../models/trial';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { TrialService } from '../../services/trial.service';
import { LogEntry } from '../../models/log-entry-type';
import { LogEntryService } from '../../services/logentry.service';
import { TrialComment } from '../../models/trial-comment.model';

@Component({
  selector: 'app-trial-comments',
  standalone: true,
  imports: [FormsModule, CommonModule, NgChartsModule],
  templateUrl: './trial-comments.component.html',
  styleUrl: './trial-comments.component.css'
})
export class TrialCommentsComponent implements OnInit, AfterViewInit {

  newComment = new TrialComment;
  publishedTrials: Trial [] = [];
  chart: any;
  logEntries: LogEntry [] = [];
  expandedTrialId: number | null = null;
  selectedTrial: Trial | undefined = undefined;
  @ViewChild('chartCanvas') chartCanvas: ElementRef | undefined;

  constructor(
    private trialServ: TrialService,
    private logEntryServ: LogEntryService,
  ) {}

  ngOnInit(): void {
    this.loadTrials();
    this.loadEntries();
  }

  ngAfterViewInit(): void {
    // After the view is initialized, check if there is a selectedTrial and create the chart
    if (this.selectedTrial && this.chartCanvas) {
      this.createChart(this.selectedTrial.id);
    }
  }

  loadTrials() {
    this.trialServ.indexByPublished().subscribe({
      next: (trialList: Trial[]) => {
        console.log(trialList);
        this.publishedTrials = trialList;
      },
      error: (problem: any) => {
        console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
      }
    });
  }

  loadEntries() {
    this.logEntryServ.index().subscribe({
      next: (logEntryList: LogEntry[]) => {
        this.logEntries = logEntryList;
      },
      error: (problem: any) => {
        console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
      }
    });
  }

  toggleExpansion(trialId: number): void {
    if (this.expandedTrialId === trialId) {
      // If the same trial is clicked, collapse it
      this.expandedTrialId = null;
    } else {
      // If a different trial is clicked, expand it and update the chart
      this.expandedTrialId = trialId;
      this.selectedTrial = this.publishedTrials.find((trial) => trial.id === trialId);

      if (this.selectedTrial) {
        this.destroyChart();
        setTimeout(() => {
          this.createChart(trialId);
          this.updateChart(this.selectedTrial);
        }, 50);
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
            { label: 'Food Health Quality', data: [] },
          ],
        },
        options: {
          aspectRatio: 4.5,
        },
      });

    } else {
      setTimeout(() => this.createChart(trialId), 50);
    }
  }

  updateChart(selectedTrial: Trial | undefined): void {
    if (!selectedTrial || !selectedTrial.startDate || !selectedTrial.endDate || selectedTrial === undefined) {
      console.error('Invalid selectedTrial:', selectedTrial);
      return;
    }

    let groupedData = new Map<string, { sleep: number[], pain: number[], activity: number[], food: number[] }>();

    // Filter log entries based on the selected trial's start and end dates
    let filteredLogEntries = this.logEntries.filter(entry => {
      return entry.entryDate >= selectedTrial.startDate && entry.entryDate <= selectedTrial.endDate;
    });

    console.log(filteredLogEntries);

    filteredLogEntries.forEach(entry => {
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

    let labels = Array.from(groupedData.keys());
    let sleepData = labels.map(date => this.average(groupedData.get(date)?.sleep || []));
    let painData = labels.map(date => this.average(groupedData.get(date)?.pain || []));
    let activityData = labels.map(date => this.average(groupedData.get(date)?.activity || []));
    let foodData = labels.map(date => this.average(groupedData.get(date)?.food || []));

    this.chart.data.labels = labels;
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
    if (this.selectedTrial) {
      this.selectedTrial.trialComments.push(this.newComment);
      this.newComment = new TrialComment;
      this.trialServ.update(this.selectedTrial).subscribe({
        next: (updatedTrial: Trial) => {
          this.selectedTrial = updatedTrial;
        },
        error: (problem: any) => {
          console.error('LogEntryListHttpComponent.loadLogEntrys(): error loading LogEntrys', problem);
        }
      });
    }
  }
}
