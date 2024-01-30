import { Category } from './../../models/category';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Trial } from '../../models/trial';
import { LogEntryType } from '../../models/log-entry-type';
import { LogEntryTypeService } from '../../services/logentrytype.service';
import { TrialService } from '../../services/trial.service';
import { LogEntryTypeComponent } from "../log-entry-type/log-entry-type.component";
import { AuthService } from '../../services/auth.service';



@Component({
    selector: 'app-trial',
    standalone: true,
    templateUrl: './trial.component.html',
    styleUrl: './trial.component.css',
    imports: [CommonModule, FormsModule, NgbTypeaheadModule, TrialComponent, LogEntryTypeComponent]
})

export class TrialComponent implements OnInit{


  Trials: Trial[] = [];
  selected: Trial | null = null;
  newTrial:Trial = new Trial();
  newType:LogEntryType|null = null;
  editTrial: Trial | null = null;
  categories: Category[]=[];
  category: Category=new Category();
  TrialTypes: LogEntryType[]=[];
  TrialType: LogEntryType = new LogEntryType();
  datePipe: DatePipe = new DatePipe("en-US");

  constructor(private authServ: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private TrialServ: TrialService, private TrialTypeServ: LogEntryTypeService,
    private categoryServ: CategoryService){}

  ngOnInit(): void {
    if(!this.authServ.checkLogin()){
      this.router.navigateByUrl('/login');
    };
    this.loadTrials();
    this.loadTrialTypes();
    this.loadCategories();
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          let TrialIdStr = params.get("trialId");
          if (TrialIdStr) {
            let TrialId = parseInt(TrialIdStr);
            if (!isNaN(TrialId)) {
              console.log(TrialId);
              this.TrialServ.show(TrialId).subscribe(
                {
                  next: (Trial: Trial | null) => {
                    this.selected = Trial;
                  },
                  error: (error: any) => {
                    console.error('Error in Triallist.component: id correct but no Trial found')
                    this.router.navigateByUrl('notFound');
                  }
                }
              )
            } else {
              this.router.navigateByUrl("invalidTrialId");
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
				term.length < 2 ? [] : this.TrialTypes.filter((entryType) => entryType.name.toLowerCase().indexOf(entryType.name.toLowerCase()) > -1).slice(0, 10),
			),
		);
    formatter = (result: LogEntryType) => result.name;
    formatterInput = (result: LogEntryType) => result.name;

  displayTrial(Trial: Trial): void {
    this.selected = Trial;
  }

  resetNewEntry() {
    this.newTrial = new Trial();
  }

  displayTable(): void {
    this.selected = null;
  }

  setEditTrial(): void {
    this.editTrial = Object.assign({}, this.selected);
  }

  cancelEdit() {
    this.editTrial = null;
  }

  loadTrials() {
    this.TrialServ.index().subscribe(
      {
        next: (TrialList: Trial[]) => {
          this.Trials = TrialList;
        },
        error: (problem: any) => {
          console.error('TrialListHttpComponent.loadTrials(): error loading Trials', problem);
        }
      }
      );
    }

  newTrialType(){
    this.newType=new LogEntryType();
  }

  loadTrialTypes() {
    this.TrialTypeServ.index().subscribe(
      {
        next: (TrialTypeList: LogEntryType[]) => {
          this.TrialTypes = TrialTypeList;
          console.log(TrialTypeList)
        },
        error: (problem: any) => {
          console.error('TrialListHttpComponent.loadTrials(): error loading Trials', problem);
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
          console.error('TrialListHttpComponent.loadTrials(): error loading Trials', problem);
        }
      }
      );
    }




  addTrial(newTrial: Trial) {
    if (newTrial) {
      this.TrialServ.create(newTrial).subscribe(
        {
          next: (createdTrial: Trial) => {
            this.Trials.push(createdTrial);
            this.loadTrials();
            this.selected=createdTrial;
            this.category=new Category();
            this.TrialType =new LogEntryType();
          },
          error: (error: any) => {
            console.error('TrialListHttpComponent.addTrials(): error creating Trial', error);
          }
        }
        );
      }
  }

  updateTrial(Trial: Trial) {

    this.TrialServ.update(Trial).subscribe(
      {
        next: (updatedTrial: any) => {
          if (this.selected) {
            this.selected = Object.assign({}, updatedTrial);
          }
          this.editTrial = null;
          this.loadTrials();
          window.location.reload();
        },
        error: (error: any) => {
          console.error('TrialListHttpComponent.updateTrial(): error updating Trial', error);
        }
      }
    );
  }

  deleteTrial(tid: number) {
    this.TrialServ.destroy(tid).subscribe(
      {
        next: () => {
          this.Trials = this.Trials.filter(Trial => Trial.id !== tid);
          if (this.selected && this.selected.id === tid) {
            this.selected = null;
          }
        },
        error: (error: any) => {
          console.error('TrialListHttpComponent.deleteTrial(): error removing Trial', error);
        }
      }
    );
  }
}
